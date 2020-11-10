import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home({ notices }) {
  return (
    <div className={styles.container}>
        {notices.map(notice => (
            <ul key={notice.id}>
                <li >
                    <Link href={`notices/${notice.id}`}>
                        <a>{notice.title}</a>
                    </Link>
                </li>
            </ul>
        ))}
    </div>
  )
}

export const getStaticProps = async () => {
    const key = { headers: { 'X-API-KEY': process.env.API_KEY } }
    const data = await fetch('https://ngoo.microcms.io/api/v1/notices', key)
        .then(res => res.json())
        .catch(() => null);
    return {
        props: {
            notices: data.contents
        }
    }
};
