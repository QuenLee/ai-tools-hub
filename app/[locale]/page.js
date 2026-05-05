import { redirect } from 'next/navigation';

export default async function LocaleHome({ params }) {
  const { locale } = await params;
  redirect(`/${locale}/tools`);
}
