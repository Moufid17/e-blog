import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './components/providers/AuthProvider'
import { Box, CssBaseline, CssVarsProvider, Sheet } from '@mui/joy'
import Header from './components/layout/Header'
// import { getServerSession } from 'next-auth'
// import authOptions from './lib/authOptions'
import CustomTheme from './theme/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eblog',
  description: 'Créer, gérer et partager vos articles en ligne.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <CssVarsProvider theme={CustomTheme}>
            <CssBaseline />
            <AuthProvider>
              <nav><Header/></nav>
              <main>
                <Box sx={{ bgcolor: 'background.body',  gridTemplateRows: '52px 0px 1fr', minHeight: '92dvh', p:1 }}>
                  <Sheet sx={{bgcolor: 'background.body', width: 'auto', height: '100%'}}>
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
