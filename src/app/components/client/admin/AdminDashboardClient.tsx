"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  parseBulkCreateInput,
  summarizeAnalytics,
  type AdminOrderSummary,
  type AdminProductSummary,
} from "./adminDashboard.utils";

type AdminDashboardClientProps = {
  initialProducts: AdminProductSummary[];
  initialOrders: AdminOrderSummary[];
};

type ProductFormState = {
  name: string;
  category: string;
  price: string;
  stock: string;
  brand: string;
  description: string;
  thumbnail: string;
  isAvailable: boolean;
  isFeatured: boolean;
};

const emptyForm: ProductFormState = {
  name: "",
  category: "others",
  price: "",
  stock: "",
  brand: "",
  description: "",
  thumbnail: "",
  isAvailable: true,
  isFeatured: false,
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function serializeProduct(payload: any): AdminProductSummary {
  return {
    id: payload.id,
    name: payload.name,
    category: payload.category,
    price: Number(payload.price || 0),
    stock: Number(payload.stock || 0),
    sales: Number(payload.sales || 0),
    isAvailable: payload.isAvailable !== false,
    isFeatured: Boolean(payload.isFeatured),
    brand: payload.brand || "Codey",
    description: payload.description || "",
    thumbnail: payload.thumbnail || "",
  };
}

export default function AdminDashboardClient({
  initialProducts,
  initialOrders,
}: AdminDashboardClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [orders] = useState(initialOrders);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingForm, setEditingForm] = useState<ProductFormState>(emptyForm);
  const [bulkText, setBulkText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const analytics = useMemo(
    () => summarizeAnalytics(products, orders),
    [orders, products],
  );

  async function submitProduct(payload: any) {
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || "Unable to save product");
    }
    return data.product;
  }

  async function updateProduct(id: number, payload: any) {
    const response = await fetch("/api/product", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...payload }),
    });
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || "Unable to update product");
    }
    return data.product;
  }

  async function deleteProduct(id: number) {
    const response = await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.error || "Unable to delete product");
    }
    return data;
  }

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
        brand: form.brand,
        thumbnail: form.thumbnail,
        category: form.category,
        description: form.description,
        isFeatured: form.isFeatured,
        isAvailable: form.isAvailable,
        otherUrl: [],
      };
      const createdProduct = await submitProduct(payload);
      setProducts((current) => [serializeProduct(createdProduct), ...current]);
      setForm(emptyForm);
      setStatus("Product created successfully.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to create product.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleBulkCreate(event: FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    setStatus(null);
    try {
      const parsed = parseBulkCreateInput(bulkText);
      if (parsed.length === 0) {
        throw new Error("Add at least one product entry.");
      }
      const createdProducts = [] as AdminProductSummary[];
      for (const item of parsed) {
        const payload = {
          name: item.name || "Untitled",
          price: Number(item.price || 0),
          stock: Number(item.stock || 0),
          brand: item.brand || "Codey",
          thumbnail: item.thumbnail || "",
          category: item.category || "others",
          description: item.description || "",
          isFeatured: Boolean(item.isFeatured),
          isAvailable: item.isAvailable !== false,
          otherUrl: Array.isArray(item.otherUrl) ? item.otherUrl : [],
        };
        const createdProduct = await submitProduct(payload);
        createdProducts.push(serializeProduct(createdProduct));
      }
      setProducts((current) => [...createdProducts, ...current]);
      setBulkText("");
      setStatus(`Created ${createdProducts.length} products.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Bulk create failed.");
    } finally {
      setIsSaving(false);
    }
  }

  function startEdit(product: AdminProductSummary) {
    setEditingId(product.id);
    setEditingForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      brand: product.brand,
      description: product.description,
      thumbnail: product.thumbnail,
      isAvailable: product.isAvailable,
      isFeatured: product.isFeatured,
    });
  }

  async function handleSaveEdit(productId: number) {
    setIsSaving(true);
    try {
      const updatedProduct = await updateProduct(productId, {
        name: editingForm.name,
        price: Number(editingForm.price),
        stock: Number(editingForm.stock),
        brand: editingForm.brand,
        thumbnail: editingForm.thumbnail,
        category: editingForm.category,
        description: editingForm.description,
        isFeatured: editingForm.isFeatured,
        isAvailable: editingForm.isAvailable,
        otherUrl: [],
      });
      setProducts((current) =>
        current.map((product) =>
          product.id === productId ? serializeProduct(updatedProduct) : product,
        ),
      );
      setEditingId(null);
      setStatus("Product updated.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to update product.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(productId: number) {
    setIsSaving(true);
    try {
      await deleteProduct(productId);
      setProducts((current) =>
        current.filter((product) => product.id !== productId),
      );
      setStatus("Product deleted.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to delete product.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function exportCsv() {
    const rows = [
      ["name", "category", "price", "stock", "sales", "featured", "available"],
      ...products.map((product) => [
        product.name,
        product.category,
        String(product.price),
        String(product.stock),
        String(product.sales),
        product.isFeatured ? "yes" : "no",
        product.isAvailable ? "yes" : "no",
      ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codey-products.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="w-full max-w-7xl px-3 py-8 lg:px-6 ">
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/70 bg-background/80 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Operations
            </p>
            <h1 className="text-2xl font-semibold text-foreground">
              Admin dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Review sales momentum, keep stock healthy, and manage product
              inventory from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={exportCsv}>
              Export CSV
            </Button>
            <Button onClick={() => setEditingId(null)}>Refresh</Button>
          </div>
        </div>
        {status ? (
          <div className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary-foreground">
            {status}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue pulse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-3xl font-semibold">
                    {formatCurrency(analytics.totalRevenue)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Orders processed
                  </p>
                </div>
                <Badge>{analytics.totalOrders} orders</Badge>
              </div>
              <svg
                viewBox="0 0 220 80"
                className="h-24 w-full rounded-lg bg-muted/60 p-2"
              >
                <path
                  d="M10 60 C30 45, 50 40, 70 47 S110 58, 130 42 S170 22, 200 28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-primary"
                />
              </svg>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border/70 p-3">
                  <p className="text-2xl font-semibold">
                    {analytics.totalProducts}
                  </p>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>
                <div className="rounded-lg border border-border/70 p-3">
                  <p className="text-2xl font-semibold">
                    {analytics.lowStockCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Low stock</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{analytics.availableCount} available</span>
                <span>{analytics.outOfStockCount} out of stock</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category mix</CardTitle>
            <CardAction>
              <Badge variant="secondary">Live from catalog</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {analytics.topCategories.length > 0 ? (
              analytics.topCategories.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-sm"
                >
                  <span className="capitalize">{item.category}</span>
                  <span className="font-medium">{item.count} products</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No catalog data yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Product manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Name</span>
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  required
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Category</span>
                <select
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  <option value="handtools">Hand tools</option>
                  <option value="powertools">Power tools</option>
                  <option value="materials">Materials</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="fasteners">Fasteners</option>
                  <option value="safetygears">Safety gear</option>
                  <option value="machineries">Machinery</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Price</span>
                <input
                  type="number"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.price}
                  onChange={(event) =>
                    setForm({ ...form, price: event.target.value })
                  }
                  required
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Stock</span>
                <input
                  type="number"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.stock}
                  onChange={(event) =>
                    setForm({ ...form, stock: event.target.value })
                  }
                  required
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Brand</span>
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.brand}
                  onChange={(event) =>
                    setForm({ ...form, brand: event.target.value })
                  }
                  required
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground">Thumbnail</span>
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.thumbnail}
                  onChange={(event) =>
                    setForm({ ...form, thumbnail: event.target.value })
                  }
                />
              </label>
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="text-muted-foreground">Description</span>
                <textarea
                  className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </label>
              <div className="flex flex-wrap gap-3 md:col-span-2">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(event) =>
                      setForm({ ...form, isAvailable: event.target.checked })
                    }
                  />
                  Available
                </label>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      setForm({ ...form, isFeatured: event.target.checked })
                    }
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-2 md:col-span-2">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Create product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setForm(emptyForm)}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bulk create</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Paste a JSON array or newline-delimited JSON objects to add
              multiple products at once.
            </p>
            <form onSubmit={handleBulkCreate} className="space-y-3">
              <textarea
                className="min-h-40 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                value={bulkText}
                onChange={(event) => setBulkText(event.target.value)}
                placeholder='[{"name":"Drill","price":120,"stock":10,"brand":"Codey","category":"powertools"}]'
              />
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Creating..." : "Bulk create"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Catalog table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="px-2 py-2">Product</th>
                  <th className="px-2 py-2">Category</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Stock</th>
                  <th className="px-2 py-2">Sales</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="align-top">
                    {editingId === product.id ? (
                      <>
                        <td className="px-2 py-3">
                          <input
                            className="w-full rounded-md border border-border bg-background px-2 py-2"
                            value={editingForm.name}
                            onChange={(event) =>
                              setEditingForm({
                                ...editingForm,
                                name: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-3">
                          <select
                            className="w-full rounded-md border border-border bg-background px-2 py-2"
                            value={editingForm.category}
                            onChange={(event) =>
                              setEditingForm({
                                ...editingForm,
                                category: event.target.value,
                              })
                            }
                          >
                            <option value="handtools">Hand tools</option>
                            <option value="powertools">Power tools</option>
                            <option value="materials">Materials</option>
                            <option value="electrical">Electrical</option>
                            <option value="plumbing">Plumbing</option>
                            <option value="fasteners">Fasteners</option>
                            <option value="safetygears">Safety gear</option>
                            <option value="machineries">Machinery</option>
                            <option value="others">Others</option>
                          </select>
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="number"
                            className="w-full rounded-md border border-border bg-background px-2 py-2"
                            value={editingForm.price}
                            onChange={(event) =>
                              setEditingForm({
                                ...editingForm,
                                price: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="number"
                            className="w-full rounded-md border border-border bg-background px-2 py-2"
                            value={editingForm.stock}
                            onChange={(event) =>
                              setEditingForm({
                                ...editingForm,
                                stock: event.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-3">
                          <input
                            type="number"
                            className="w-full rounded-md border border-border bg-background px-2 py-2"
                            value={product.sales}
                            readOnly
                          />
                        </td>
                        <td className="px-2 py-3">
                          <label className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={editingForm.isAvailable}
                              onChange={(event) =>
                                setEditingForm({
                                  ...editingForm,
                                  isAvailable: event.target.checked,
                                })
                              }
                            />
                            Avail.
                          </label>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSaveEdit(product.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-3">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {product.brand}
                          </div>
                        </td>
                        <td className="px-2 py-3 capitalize">
                          {product.category}
                        </td>
                        <td className="px-2 py-3">
                          {formatCurrency(Number(product.price))}
                        </td>
                        <td className="px-2 py-3">{product.stock}</td>
                        <td className="px-2 py-3">{product.sales}</td>
                        <td className="px-2 py-3">
                          <Badge>
                            {product.isAvailable ? "Available" : "Hidden"}
                          </Badge>
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(product)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
