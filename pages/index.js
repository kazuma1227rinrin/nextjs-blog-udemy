import { Inter } from 'next/font/google'
import Layout, { siteTitle } from './posts/conponents/Layout'
import utilStyle from "../styles/utils.module.css"
import Link from 'next/link'
import styles from "../styles/home.module.css"
import {getPostsData} from "../lib/post";
import Head from 'next/head'

// SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); //id,title,data,thumbnail
  console.log(allPostsData);

  return{
    props:{
      allPostsData,
    }
  }
}

// SSRの場合
// export async function getServerSideProps(context){
//   return{
//     props:{
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

const inter = Inter({ subsets: ['latin'] })

export default function Home({allPostsData}) {
  return (
    <>
    <Head>
      <title>
        {siteTitle}
      </title>
    </Head>
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>イエーイ！見てる〜？？</p>
      </section>

      <section>
        <h2>
          📝にんじんの畑
        </h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail})=>(                  
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img 
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`} >
                <p className={utilStyle.boldText}>{title}</p>
              </Link>
              <br/>
              <small className={utilStyle.lightText}>
                {date}
              </small>
            </article>
            ))}

        </div>
      </section>
    </Layout>
    </>) ;
}
