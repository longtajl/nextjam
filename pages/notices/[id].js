import styles from "../../styles/Home.module.css";

export default function Notice({ notice }) {
    return (
        <main className={styles.container}>
            <h1>{notice.title}</h1>
            <p>{notice.publishedAt}</p>
            <div
                dangerouslySetInnerHTML={{
                    __html: `${notice.text}`,
                }}
            />
        </main>
    )
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };
    const data = await fetch('https://ngoo.microcms.io/api/v1/notices', key)
        .then(res => res.json())
        .catch(() => null);
    const paths = data.contents.map(content => `/notices/${content.id}`);
    console.log(paths);
    return {paths, fallback: false};
};

export const getStaticProps = async context => {
    const id = context.params.id;
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };
    const data = await fetch(
        'https://ngoo.microcms.io/api/v1/notices/' + id,
        key,
    )
        .then(res => res.json())
        .catch(() => null);
    return {
        props: {
            notice: data,
        },
    };
};
