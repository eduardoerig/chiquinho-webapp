import { getSettings } from "@/utils/settings";
import { FooterClient } from "./FooterClient";

export async function Footer() {
  const settings = await getSettings();
  
  return <FooterClient settings={settings} />;
}
