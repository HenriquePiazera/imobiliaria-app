import { redirect } from "next/navigation";

type RegisterPageProps = {
  searchParams: Promise<{ mode?: string }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams;
  const mode = params.mode ?? "register";

  redirect(`/login?mode=${mode}`);
}
