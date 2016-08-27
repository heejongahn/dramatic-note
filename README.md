# Dramatic Note

드라마앤컴퍼니 웹 개발 그룹 면접 과제로 제작한 single page application 입니다.

# 사용 버전

- Python 3.5.1
- Node 6.0.0

# 실행 스크립트

```bash
pip install -r requirements.txt
npm install

npm run build
npm run start

npm run test # for test
```

# 기술 스택

## Server-side

- 웹 프레임워크 : [Flask](http://flask.pocoo.org/)
- ORM : [Flask-SQLAlchemy](http://flask-sqlalchemy.pocoo.org/2.1/)

## Client-side

- 뷰 레이어 : [React](https://facebook.github.io/react/)
- 라우팅 : [React-router](https://github.com/reactjs/react-router)
- 상태(데이터) 관리 : [Redux](redux.js.org)
- 리액트와 리덕트 바인딩 : [React-redux](https://github.com/reactjs/react-redux)
- 프론트엔드 프레임워크 : [Bootstrap](getbootstrap.com)

## Tools

- 모듈 번들링 : [Webpack](https://webpack.github.io)
- 트랜스파일러 : [Babel](https://babeljs.io/)
- 서버사이드 의존성 관리 : pip
- 클라이언트 사이드 의존성 관리 및 스크립팅 : [npm](https://www.npmjs.com)
- 자바스크립트 테스팅 : [tape](https://github.com/substack/tape)

# 앱 구조

기본적으로 리덕스의 [세 가지 원칙](http://redux.js.org/docs/introduction/ThreePrinciples.html)을
따르게 만들었습니다.

1. Single source of truth : 이 원칙에 따르면 앱 내의 모든 데이터는 하나의 store
   tree 내에 저장되어있어야 합니다. 제가 만든 앱에서는 react-router가 관리하는
   클라이언트 사이드 라우팅 관련 정보를 제외한 모든 정보가 redux store에
   저장되어 있습니다. 리액트는 redux store 내의 데이터를 props로 받아서 렌더링
   하는 역할만 담당합니다.

2. State is read-only : 사용자 액션으로 인해 UI 상의 변화가 일어나고, redux
   store 에 저장되어 있는 앱 내 데이터를 변경할 필요가 생겼을 때, UI단에서 직접
   store를 건드리지 않습니다. 대신 해당하는 액션을 react-redux를 통해 dispatch
   하고, 이 dispatch 된 액션을 리듀서에서 처리하는 식으로 store에 반영합니다.

3. Changes are made with pure functions : 리듀서는 기존의 상태를 변경하지 않고,
   기존의 상태와 액션을 입력으로 받아 새로운 상태를 반환하는 순함수(pure
   function)으로 작성되어 있습니다.

![Flux structure](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)

Flux 아키텍쳐와 같은 구조로 이루어져 있고, 각각 아래와 같은 부분을 담당합니다.

- Store : Redux(저장소)
- Dispatcher : React-redux
- View : React

데이터 흐름을 기준으로는 다음과 같습니다.

1. 맨 처음 React가 서버에서 받아온 데이터를 기반으로 뷰 렌더링
2. 뷰에서 사용자가 데이터를 변경하는 행동(e.g. 메모 생성)을 할 시 액션 생성
3. React-redux를 통해 생성된 액션을 스토어로 dispatch
4. 리듀서에서 비즈니스 로직 처리하고 스토어에 새로운 상태 할당
5. 새로운 상태를 기반으로 뷰 재 렌더링
6. 2로 가서 반복

babel(트랜스파일)과 webpack(모듈 번들링)을 이용해 최종적으로 서비스 서버는
`_bundle.js` 한 파일만 서빙합니다. 그리고 코드에서 사용한 ES6 피쳐들이 IE에서도
정상적으로 작동하도록 하기 위해 `babel-polyfill`을 CDN에서부터 받아옵니다.

# 폴더 구조

```bash
├── README.md                 - 리드미 파일
│
├── app/                      - 어플리케이션 폴더
│   ├── __init__.py           - 서버 파이썬 모듈 초기화
│   ├── models.py             - 서버 모델 정의
│   │── views.py              - 서버 뷰 함수(API 엔드포인트) 정의
│   │ 
│   ├── src/                  - 클라이언트 사이드 폴더
│   │   ├── actions.js        - 액션 정의
│   │   ├── components/       - 리액트 컴포넌트
│   │   ├── containers/       - 리액트 컨테이너
│   │   ├── main.js           - 메인 자바스크립트 (webpack 엔트리 포인트)
│   │   ├── main.scss         - 메인 스타일시트
│   │   └── reducers.js       - 리듀서 정의
│   │   └── test/             - 클라이언트 테스트 파일 폴더
│   │ 
│   ├── static/               - 스태틱 폴더 (빌드 결과물)
│   │   ├── _bundle.js        - webpack을 통해 빌드된 서빙용 자바스크립트
│   │   └── fonts/            - 부트스트랩이 사용하는 폰트들
│   │ 
│   └── templates/            - 템플릿 폴더
│       └── main.html         - React container를 포함하는 메인 템플릿
│ 
├── config.py                 - flask 앱 설정 파일
├── dramatic.db               - SQLite3 데이터베이스
├── package.json              - npm 설정
├── requirements.txt          - pip 디펜던시 리스트
├── run.py                    - 서버 시작 스크립트
├── run_with_dummy.py         - 더미 데이터가 있는 서버 시작 스크립트
├── storeSpec.js              - store 스펙 정의 (사용하지 않는 파일)
└── webpack.config.js         - webpack 설정
```

# 개선 사항

## reducers.js 파일 리팩토링

리듀서는 상태와 액션을 받아 새로운 상태를 리턴하는 순함수로 짜여져야 합니다.
그런데 자바스크립트의 네이티브 `Object API`에는 파이썬의 dictionary comprehension
같은, 기존의 객체에 어떤 변경을 가한 새로운 객체를 만들어 리턴하는 간편한 방법이
존재하지 않습니다. ES6에서 추가된 `Object.assign` 메소드를 사용해 목적은 달성했지만,
결과적으로 코드가 매우 verbose 해졌고, 가독성이 떨어지게 되었습니다.

이 상황을 개선하기 위한 방법으로 다음과 같은 해결책이 있습니다. 일단 다른
자료구조, 구체적으로는 [ImmutableJS](https://facebook.github.io/immutable-js/)의
`Map` 자료구조로 현재 스토어에서 사용중인 네이티브 `Object`를 완벽하게
대체하면서 훨씬 명료한 코드를 짤 수 있습니다. 예를 들어 다음과 같은 코드를:

```javascript
labels: Object.assign({}, ...Object.keys(state.labels)
  .filter(id => id != action.id)
  .map(id => ({ [id]: state.labels[id]}))
  )
```

다음과 같이 대체할 수 있습니다.

```javascript
labels: state.labels.filter((key, value) => key != action.id)
```

그리고, redux의 `combineReducers`를 이용해 state의 세 필드(`memos`, `labels`,
`checkedMemoIds`)를 담당하는 리듀서를 쪼갬으로서 훨씬 가독성이 좋은 코드를 짤 수
있습니다. 지금 로직상으로는 `memos`와 `labels`를 동시에 조작하는 액션(메모에
라벨을 붙이거나 떼는 액션)이 존재해서 `memos`와 `labels`의 리듀서를 떼어놓지
못했는데, 해당 작업을 두 개의 액션으로 나눈 뒤에 그 둘을 하나의 트랜잭션으로
묶을 수 있다면 분리가 가능하고 코드가 훨신 깔끔해 질 것이라 생각합니다.

## 서버-클라이언트 싱크 문제

현재 이 앱은 네트워크 오버헤드를 줄이기 위해 초기 구동시 한 번만 서버에서 전체
데이터를 받아오고, 그 뒤 일어나는 변화에 대해서는 변화된 부분에 대한 정보만
주고받아 클라이언트 단에서 업데이트를 처리하는 식으로 만들어져 있습니다.

이 때 현재는 보수적인 접근으로 일단 클라이언트 단에서 API 콜이 날아간 뒤 서버
측에서 응답이 들어왔을 시에만 알맞게 클라이언트 단 스토어를 변경하고 있습니다.
이러한 방식으로는 로직이 간단하고 서버에 반영된 데이터만 클라이언트에서
보여준다는 장점이 있지만, 네트워크 환경이 좋지 않을 시 클라이언트의 액션이
일어난 후 실제로 앱에 데이터 변경이 반영되기까지의 시간이 오래 걸린다는 단점이
있습니다.

이러한 단점을 개선하기 위해 낙관적으로 일단 클라이언트 사이드의 상태를 먼저
변경한 뒤 API 콜을 날리고 만약 응답을 받은 후 문제가 발생했다는 것을 확인할 시
전체 데이터를 다시 받아와 데이터를 서버와 싱크 시키는 등의 접근을 취할 수
있습니다. 이 방법을 채택할 시 예를 들어 클라이언트단에서 새로 생성된 메모의 id를
결정해줘야 하는 등 귀찮아지는 부분이 조금 생기는데, Google Keep 같은 프로그램을
보면 힘들어도 만들 수는 있을 것 같습니다.

## React component / container 분리

React에서는 props를 받아 렌더링만 하는, 뷰를 담당하는 component와 애플리케이션의
데이터(state)에 대해 알고 있고 변경을 위한 액션을 취할 수 있는 container를
분리하도록 권장하고 있습니다. 이번 과제에서는 빠르게 개발하려다보니 대부분의
컴포넌트가 container로 분류되게 되었지만, 만약 좀 더 시간을 갖고 코드를
리팩토링해 representation 을 담당하는 부분은 component로 빼주고 container에는
데이터만 담도록 관심사의 분리를 실행한다면 장기적으로 유지보수성이 더 좋아질
것입니다.

## UX를 위한 스타일시트 개선

현재 스타일시트 상에서는 새로운 글 작성, 또는 글 수정을 위한 판넬이 한 눈에
사용자에게 들어오지 않습니다. 특정 메모를 선택한 상황에서 다시 메모 작성으로
돌아가기 위한 (모든 라벨 LabelItem에 있는) 새 메모 작성 버튼도 상대적으로 눈에
띄지 않는 편인데, 칼라링만 잘 해줘도 사이트의 통일성을 해치지 않으면서 이러한
선택지들을 좀 더 눈에 띄게 할 수 있을 것 같습니다.

## 테스팅

시간 관계상 redux synchronous action creator 와 reducer 에 관한 테스트만을
작성할 수 있었습니다. 서버측 엔드포인트, 비동기 API 콜, 리액트 컴포넌트 등에
대해 커버하는 테스트를 작성하고 현재 커버하는 부분들에 대해서도 좀 더 다양하고
많은 케이스를 커버하도록 테스트 케이스를 보강하면 좋을 것 같습니다. 서버측
테스트는 [Flask-Testing](https://pythonhosted.org/Flask-Testing/) 확장을
사용하면 해결할 수 있을 것 같고, 리액트 컴포넌트 테스트는 Redux 공식
다큐멘테이션에서 추천하는 [Enzyme](https://github.com/airbnb/enzyme)을 쓰면
될 것 같습니다.

## 기타

- ESLint 를 통한 스타일 린팅
- 명명법 덜 verbose 하게 변경
- (실제 서비스로 만들시) 유저 및 세션 관련 기능 구현
- (실제 서비스로 만들시) 스타일시트 모듈화
