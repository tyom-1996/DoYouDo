import { useRouter } from 'next/router';
import Head from 'next/head';
import withAuth from '../../components/withAuth';
import {memo} from "react";

export async function getServerSideProps({ params }) {
    const id = params.id;

    console.log(params, 'params')

    return {
        props: {
            id,
            name2: `hkjhgkjhkjhlk`
        }
    };
}



const Profile = ({ id, name2 }) => {
    const router = useRouter();
    // const { id, name2 } = router.query;

    return (
        <div className={'wraap'}>
            <Head>
                <title>PROFILE {id}</title>
                <meta name="description" content={`Learn more about item ${id}.`}/>
            </Head>
            <main>
                <h1>About {id}</h1>
                <PrintName
                    id={id}
                    name2={name2}
                />
            </main>
        </div>
    );
};


const PrintName = memo(({id, name2} ) => {
    return (
        <p>This is the about page for item {id} --- {name2}.</p>

    )
})
export default withAuth(Profile);
