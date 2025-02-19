import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './components/providers/AuthProvider'
import { Box, CssBaseline, CssVarsProvider, Sheet } from '@mui/joy'
import Header from './components/layout/Header'
import { getServerSession } from 'next-auth'
import authOptions from './lib/authOptions'
import CustomTheme from './testStyle/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EsgiBloc',
  description: 'Blog dédié à l\'esgi',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <CssVarsProvider theme={CustomTheme}>
            <CssBaseline />
            <AuthProvider>
              <nav><Header/></nav>
              <main>
                <Box
                    sx={{
                      bgcolor: 'white',
                      gridTemplateRows: '52px 0px 1fr',
                      minHeight: '90dvh',
                      p:1
                    }}
                    >
                    <Sheet>
                      {children}
                    </Sheet>
                </Box>
              </main>
            </AuthProvider>
          </CssVarsProvider>
        </body>
    </html>
  )
}
