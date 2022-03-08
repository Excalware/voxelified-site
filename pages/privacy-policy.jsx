import App from '/voxeliface/components/App';
import Main from '/voxeliface/components/Main';
import Header from '/components/Header';
import Typography from '/voxeliface/components/Typography';

export default function PrivacyPolicy() {
    return (
        <App>
            <Header/>
            <Main>
                <Typography
                    text="Privacy."
                    size="2rem"
                />
            </Main>
        </App>
    );
};