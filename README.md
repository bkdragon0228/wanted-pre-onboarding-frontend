# wanted-pre-onboarding-frontend
## 원티드 프리온보딩 프론트엔드
원티드 프리온보딩 프론트엔드 과정 선발 과제를 코드를 작성한 저장소입니다.

### 이름
김범규

### 실행 방법
```
npm install
npm start
```

### 실행 영상
https://github.com/bkdragon0228/wanted-pre-onboarding-frontend/assets/77627957/d786dd89-aa83-42d4-a915-faed3cb7068f


### 개발 스펙
* React
* TypeScript
* React Router
* Emotion
* Axios
* React-Testing-Library
* Jest
* MSW

### 주요 기능

1. 로그인
   주어진 api를 통해 로그인 기능을 구현했습니다.
   로그인에 실패할 경우 에러메시지를 alert창을 통해 보여줍니다.
   이메일과 비밀번호 형식에 맞지 않을 경우 로그인 할 수 없습니다.
   
3. 회원가입
   주어진 api를 통해 회원가입 기능을 구현했습니다.
   회원가입에 실패할 경우 에러메시지를 alert창을 통해 보여줍니다.
   이메일과 비밀번호 형식에 맞지 않을 경우 회원가입 할 수 없습니다.
   
3. 할 일 조회, 추가, 삭제, 수정
   주어진 api를 통해 할 일과 관련된 기능을 구현했습니다..
   useTodos hook 내부에 관련된 로직이 모여있습니다.

4. 테스트
   RTL과 Jest로 단위 테스트를 구현했습니다.
   MSW로 Api 응답 데이터를 mocking 하여 api에 관한 테스트를 구현했습니다.
