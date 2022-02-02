import App from '../components/App';
import Main from '../components/Main';
import Header from '../components/Header';
import Typography from '../components/Typography';

export default function PrivacyPolicy() {
    return (
        <App>
            <Header text="voxel" icon={"/favicon.ico"}/>
            <Main>
                <Typography
                    text="Privacy."
                    size="2rem"
                />
            </Main>
        </App>
    );
};