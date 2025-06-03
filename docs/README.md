# 〇準備

- WSLをインストールし、Ubuntuを立ち上げる
  ![alt text](images/image.png)
- npm、reactをインストールしプロジェクトを作成・起動する\
  https://noauto-nolife.com/post/ubuntu-react-install/
- Visual Studio Codeで開く（`code .`）

# 〇React理解

### ◆SPAに関して

[今さら聞けないSPA（シングルページアプリケーション）とは](https://qiita.com/shinkai_/items/79e539b614ac52e48ca4)

飯田橋の開発環境

- PC(=`Backbone.js`)
- スマホ(=`React`)

  - どちらもSPA (Single Page Application)

- MPA（Multi Page Application）との違い
  - **HTMLの生成**⇒ MPA：サーバー側　SPA：クライアント側 ※初回読み込み時等を除く
  - **情報の更新**⇒ MPA：ページ遷移　SPA：コンテンツのみ更新

### ◆package.json / node_modules について

[そろそろ適当に npm install するのを卒業する](https://qiita.com/sugurutakahashi12345/items/3cc49926faeaf25d3051)

WEBアプリケーションを開発する際、外部パッケージを多く用いる。 (Reactもパッケージの1種)
`package.json`（パッケージを管理するファイル）について理解。

### ◆ビルドについて

[React がビルドされるまでの流れを理解したい](https://zenn.dev/aidemy/articles/355aff43e45c34)

SPAのアプリケーションを実行する際は、`HTML/JS`ファイルをアプリケーションからクライアントに送付する。
「`HTML/JS`ファイル」の実装内容を反映させられるように、ビルドツールによって以下を行う。

- TypeScript→JavaScriptへのトランスパイル
- `minify`（圧縮）
- 外部パッケージの解決 など

# 〇実装練習

### ◆componentとpropsの関係

1. `App.tsx`内に`checkbox/button`を作成し、`checkbox`が`checked`な状態なら`button`が非活性(`disabled`)になるように実装。
2. 1.の内容をファイル分割して実装。
   ※以下の3ファイルを作成
   ・`App.tsx`
   ・`Checkbox.tsx`
   ・`Button.tsx`
   ![alt text](images/image-4.png)

### ◆react-routerの使用

- `react-router`パッケージをインストール（`package.json dependencies`に追加）
- 「`/`」にて押下すると「`/home`」へ遷移するURLを記載
- 「`/home`」にて押下すると「`/`」へ遷移するボタンを実装
  ⇒ボタンについて、再利用性の高いcomponentを意識。
  ![alt text](images/image-3.png)

> ◎`useNavigate`フックを用いてページ遷移（ルーティング）を行う

> ◎`Botton.tsx`について、情報を渡して使用する形に定義すると再利用性が高くなる

### ◆ネストしているURLの実装

- 「`/`」にて押下すると「`/article`」へ遷移するボタンを実装
- 「`/article`」にて「`/article/:id`」へ遷移するボタンを1~5まで実装
- 「`/article:id`」では、「`/article`」の画面下部に「This is article :id !」と表示される
  ![alt text](images/image-2.png)

> ◎あるURL (`/article`) の共通レイアウト部分と、ネストしたURL (/:id) のレイアウト部分を共存させる場合、` <Outlet />`を用いる

> ◎`<Route />`の設定も調整する必要がある

> ◎URLパラメータの取得には、`useParams`フックを用いる

### ◆画面間での情報引継

- 「`/`」にて押下すると「`/article`」へ遷移するボタンを実装
- 「`/article`」にて「`/article/:id`」へ遷移するボタンを1~5まで実装
- 「`/article/:id`」では、「`/article`」の画面下部に「This is article :id !」と遷移元(前の画面)の「`/article/:id`」が表示される（「from:id」）
  ⇒「/」から遷移してきた場合は「from:id」が表示されない
  ![alt text](images/image-5.png)

> ◎`useLocation`フックを用いると、画面間で引き継ぐ情報( `state` )や現在のURL ( `pathname`)を取得できる

> ◎`??`や `||`、 `&&`の演算子を用いることで、`null`や`undefined`が入り込むことを防ぐことができる

### ◆API経由のデータ取得

- 「 https://jsonplaceholder.typicode.com/posts 」 にリクエストを送り、post情報の配列を取得
- 「`/posts`」にて取得したpost情報のタイトルを羅列表示、クリックすると「`/post/:id`」に遷移し、対応するpost情報（body）をタイトル下に表示する
  ![alt text](images/image-6.png)

> ◎`fetch`関数を用いて取得する

> ◎`useState`を用いて保持・表示する

> ◎`post`においても型定義を行い`any`型は使わない

### ◆データフェッチの方法を@tanstack/react-queryに変更

- `@tanstack/react-query`をインストール

```bash
npm install @tanstack/react-query
```

> ◎`queryFn`の定義内でエラーをthrowする（しないとerrorがnull以外の値にならない）

> ◎開発者ツールのnetworkタブにて、通信の様子（statusコードなど）を確認することができる

> ◎現場ではAPIごとのIF仕様書に基づき、リクエスト/レスポンスの型定義を行う

### ディレクトリ構成について

> ◎`/pages`ディレクトリ直下に各ページのディレクトリを置く。

> ◎各ページのディレクトリ構成\
>  例：/posts関連のファイル\
>  └pages\
>  　└posts\
>  　　└components　◎大きい部品と、その中に含まれる小さい部品全て\
>  　　　└Posts.tsx（Posts全体のコンポーネント）\
>  　　　└PostDetail.tsx（PostDetail全体のコンポーネント）\  
>  　　　└panes　◎小さい部品たち（一部省略）\
>  　　　　└PostBodyPane.tsx (カラーやフォントなど、スタイルを記載する部分)\
>  　　　　└PostDetailPane.tsx (「/posts/:id」で表示される部分)\
>  　　　　└LoadingPane.tsx (loading状態で表示される部分)\
>  　　　　└ErrorPane.tsx (エラー状態で表示される部分)\
>  　　└containers ◎コンテナたち（部品に渡す色々な定義をしている）\
>  　　　└PostsContainer.tsx（Postsのコンテナ）\
>  　　　└PostsDetailContainer.tsx（PostDetailのコンテナ）

- それぞれの役割詳細

1.  /containers直下(例：PostsContainer.tsx,PostsDetailContainer.tsx)

    > ◎router/Router.tsxで使用。stateやロジックを定義

2.  /components直下(例：Posts.tsx,PostDetail.tsx)

    > ◎対応するcontainerで表示し、propsでstateや変数、ロジックを受け取る\
    > ◎ここではstateやロジックを定義せず、あくまでも受け取るのみ。そして、さらに③にstateやロジックを受け渡す

3.  /components/panes直下(例：LoadingPane.tsx,PostBodyPane.tsx)
    > ◎②の個々の表示部分を定義\
    > ◎①→②と渡ってきたstateやロジックを用いる

### ◆単体テストの実装

- テストファイルについて

  > ◎テスト対象ファイルがあるディレクトリに、`__tests__`ディレクトリを作成する\
  > ◎`__tests__`ディレクトリ内に`<対象ファイル名>.test.tsx`を作成する

- テストファイル基本(例)

  ```bash
  // Greeting.tsx(テスト対象：動作部分のみ)
  export const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
  };

  //Greeting.test.tsx(テストファイル：構文部分のみ)
  describe("Greetingのテスト", () => {  //describeは入れ子にもできる（分岐がある場合など）
  test("Hello, Taro!が表示されること", () => {
    render(<Greeting name="Taro" />);
    expect(screen.getByText("Hello, Taro!")).toBeInTheDocument();
  });
  });
  ```

> ◎原則
>
> - `test`の説明 (第一引数) は、「~であること」のように期待値の内容を記述する
> - `test`のコールバック (第二引数) 内の`expect`は1つ ⇒1ケースあたり1つの期待値
> - モックの返り値指定や`render`関数の実行など、同じ処理を複数テストケースで実行する場合は、`describe`配下に複数`test`をまとめ、`beforeEach`を用いる
