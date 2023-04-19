import { AiProvider } from "@/modules/ai/Provider";
import { DataProvider } from "@/modules/data/Provider";
import { UIProvider } from "@/modules/ui/Provider";
import { GlobalErrorHandler } from "@/modules/errors/GlobalErrorHandler";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalErrorHandler>
          <UIProvider>
            <DataProvider>
              <AiProvider>{children}</AiProvider>
            </DataProvider>
          </UIProvider>
        </GlobalErrorHandler>
      </body>
    </html>
  );
}
