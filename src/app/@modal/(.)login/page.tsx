import { LoginForm } from "@/components/ui/login-form";
import BackdropBg from "../../components/client/backdrop-bg";

export default function Page() {
  return (
    <>
      <BackdropBg />
      <div className="md:max-w-4xl w-full max-w-sm  fixed top-1/2 -translate-1/2 left-1/2 z-50">
        <LoginForm />
      </div>
    </>
  );
}
