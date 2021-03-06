import type { NextPage } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Dashboard from '../components/Dashboard'

export default function Home({
    
}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Dashboard/>
        </Layout>
    )
    
}