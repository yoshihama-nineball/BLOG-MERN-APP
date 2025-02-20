import CreatePost from "./components/CreatePost";

export const metadata = {
  title: 'App Router',
}

export default function Page() {
  return (
    <>
      <h1>App Router</h1>
      <CreatePost />
    </>
  )
}
