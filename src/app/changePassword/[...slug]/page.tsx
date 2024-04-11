import ChangePasswordForm from "@/components/Forms/components/ChangePasswordForm";


export default function ChangePasswordPage({ params }: { params: { slug: string[] } }) {
  return <ChangePasswordForm searchParams={params.slug} />;
}
