import { useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const { IMP } = window;

  const containerRef = useRef(null);

  useEffect(() => {
    window.onload = () => {
      // 2. 고객사 체크아웃 페이지가 렌더링 되면
      // 2-1. "고객사 식별코드"를 전달 해 포트원 객체를 초기화합니다.
      IMP.init('imp33624147');

      // 2-2. "결제 요청 데이터"와 결제 프로세스가 종료되면 호출 될 "콜백 함수"를 전달하여 PG사 버튼 렌더링을 시도합니다.
      // 이때 전달하는 파라미터는 IMP.request_pay 함수 호출시 전달하는 파라미터와 동일합니다.

      IMP.loadUI(
        'paypal-spb',
        {
          pg: 'paypal_v2',
          merchant_uid: `merchant-${new Date().getTime()}-${Math.ceil(
            Math.random() * 1000,
          )}`,
          name: 'test',
          amount: 1,
          buyer_email: 'ghwnd6448@gmail.com',
          buyer_name: '강호중',
          m_redirect_url: 'https://tinytingel.ai/pay_redirect',
          pay_method: 'paypal',
        },
        async (rsp) => {
          console.log(rsp);

          console.log('IMP LOADUI의 callback 호출');
        },
      );

      // 4. 구매자가 PG사 버튼을 누르면 PG사 결제창이 렌더링 됩니다.
      // 5. 이때 포트원은 내부적으로 IMP.request_pay 함수를 고객사 대신 호출합니다.
      // 6-7. 포트원 DB에 미결제(ready) 결제 건이 생성됩니다.
      // 8. PG사 결제창이 호출됩니다.
      // 9. 결제 프로세스가 종료되면 2-2번에 두번째 파라미터로 전달 한 콜백 함수가 호출됩니다.
    };
  }, [IMP, containerRef]);

  return (
    <>
      <div
        className="portone-ui-container"
        data-portone-ui-type="paypal-spb"
        // style={{ width: '100px', height: '100px' }}
        ref={containerRef}
      ></div>
    </>
  );
}

export default App;
