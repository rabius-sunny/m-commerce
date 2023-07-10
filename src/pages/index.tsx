import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Home() {
  const { replace } = useRouter()
  useEffect(() => {
    replace('/shop')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}
