import React, { useEffect, useState } from 'react';
import Image from "next/image";
import '../../../assets/css/portfolio_single_page.css';
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import Swiper from '../../includes/Swiper'
import Head from 'next/head';
import { useRouter } from 'next/router';
import {useGetPortfolioById} from "@/hooks/useGetPortfolioById";


export async function getServerSideProps({ params }) {
    const id = params.id;
    console.log(params, 'params_____')
    return {
        props: {
            id,
        }
    };
}


export default function Portfolio ({id}) {
    const [windowHeight, setWindowHeight] = useState(0);
    const { getPortfolioById, portfolioByIdData } = useGetPortfolioById();

    useEffect(() => {
        console.log(id, 'id______')
        getPortfolioById(id)
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight);
        }
    }, []);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const portfolioImages = portfolioByIdData?.data?.image_url
        ? JSON.parse(portfolioByIdData.data.image_url)  // Parse JSON string into an array
        : [];



    return (
        <>
            <main className='general_page_wrapper'>
                <Head>
                    <title>Страница работы в портфолио</title>
                    <meta name="dwsdwdwd" content="This is the home page" />
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>

                </Head>
                <div className="home_general_wrapper" id="portfolio">
                    <Header activePage='freelancers_page'/>
                    <div className="portfolio_main_wrapper">
                        <div className='portfolio_title_info_wrapper'>
                            <h1 className='portfolio_title'>{portfolioByIdData?.data?.project_name}</h1>
                            <p className='portfolio_info'>
                                {portfolioByIdData?.data?.category?.name}
                            </p>
                        </div>
                        <div className="portfolio_swiper_wrapper">
                            <Swiper portfolioImages={portfolioImages}/>
                        </div>
                        <div className='portfolio_infos_wrapper'>

                            <p className="portfolio_info">
                                {portfolioByIdData?.data?.description}
                            </p>
                        </div>
                    </div>
                </div>
                <Footer activePage='freelancers_page'/>

            </main>
        </>
    );
}
