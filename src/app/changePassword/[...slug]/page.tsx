import ChangePasswordForm from "@/components/Forms/ChangePasswordForm";


export default function ChangePasswordPage({ params }: { params: { slug: string[] } }) {
  return <ChangePasswordForm searchParams={params.slug} />;
}
