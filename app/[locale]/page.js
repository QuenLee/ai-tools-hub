import { redirect } from 'next/navigation';

export default function LocaleHome({ params }) {
  redirect(`/${params.locale}/tools`);
}
