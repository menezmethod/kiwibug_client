import {AppProvider} from '@/providers/app';
import {AppRoutes} from '@/routes';

import Snackbar from './components/Notifications/Snackbar';

export default function App() {
    return (
        <AppProvider>
            <Snackbar/>
            <AppRoutes/>
        </AppProvider>
    );
}
