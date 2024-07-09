import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className='p-2'>{children}
        <ToastContainer />
      </body>
    </html>
  );
}
