import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from 'components';
import { ModalProvider, BackgroundColorProvider } from 'context';
import { CommunityPage } from 'pages/community';
import BookModal from 'pages/modal/BookModal';
import { MyPage } from 'pages/mypage/MyPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <></>,

    children: [
      {
        path: '/',
        element: <></>,
      },
      {
        path: '/book/:id',
        element: <></>,
      },
      { path: '/community', element: <CommunityPage /> },
      { path: '/profile', element: <MyPage /> },
      { path: '/modal', element: <BookModal /> },
    ],
  },
]);

function App() {
  return (
    <BackgroundColorProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </BackgroundColorProvider>
  );
}

export default App;
