import { useRouter } from 'next/router'


export default function Compare() {

    const router = useRouter()
    const queryObj = router.query;


    return (
      <div className="content">
        <div className=""></div>
        <div className="">
          <span className="text-sm">Copyright PACom</span>
        </div>
        <div className="flex-end flex"></div>
      </div>
    );
  }
  