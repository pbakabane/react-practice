# Gitを用いた練習

### ◆準備

- 体系的理解\
  https://backlog.com/ja/git-tutorial/intro/01/
  > ◎「作業スペースの内容をリポジトリに反映する(push)」 「リポジトリの内容を作業スペースに反映する(pull)」作業をすることで、作業ごとの差分の同期ができる
- GitHub上にPublicなリポジトリを作成
  ⇒共有する際はブラウザを開いた際のURLでよいが、マージ等行う予定がある場合は招待を行う
- ローカルの内容をリポジトリへ連携\
  https://qiita.com/tariki-code/items/1c1d720bf389d1c47d85

  > 「`git clone`」⇒リポジトリ上に既存のコードがあって、自分の作業場所にリポジトリのコードを持ってきたい場合

  > ◎「`git remote add`」⇒自分の作業場所にリポジトリに反映したいコードがある場合

- 「`Git Graph`」拡張機能をインストールすると、現在のGitのブランチの状態を視覚的に確認できる

### ◆ブランチ作成、push、PR (Pull Request) の作成

- developブランチを作成
- 作業内容（ローカル）を `develop`ブランチでpushし、PR (Pull Request) を作成する
  ⇒PRはレビュワーに連携、確認完了次第マージされる
- `main`ブランチをpullする（マージされた内容をローカルに取り込む）

> ◎PR・MR(Merge Request)では、`description`の部分に「このブランチでは何を実装したか?」 「(もしあれば)どんな分からない部分があるか?」などを記述する

> ◎PR・MR(Merge Request)では、レビュワーや指摘対応者を指定する

### ◆不要ファイルをPRから除外

- `package.json`と同階層に `.gitignore`ファイルを作成
  ⇒除外対象のファイル名を記載

> ◎一度gitにアップしている場合はキャッシュを削除する必要がある\
> https://qiita.com/fuwamaki/items/3ed021163e50beab7154

### ◆コミットの修正

https://qiita.com/KTakata/items/d33185fc0457c08654a5

> ◎`git rebase(各種オプション)`にて過去のコミットに手を加えることができる（ローカルの履歴に合わせるため、強制pushを行う）

```bash
$ git push --force-with-lease
```

※自分が最後に見たリモートの状態と同じ（他人の更新がない）場合はpushされる。
※他人の更新があった場合は`rebase`し直してから、再度実行する

> ◎同じコメントで表せるような作業（修正作業のまた修正など）の場合は、新たにコミットを打つのではなく編集して見直す

> ◎コミットをまだリモートに`push`していない場合は、下記でコミットに現在の変更点を追加（上書き）できる

```bash
$ git add .
$ git commit --amend
```

### ◆PRマージ後、ローカルでの作業

最新のリモートリポジトリの内容をローカルリポジトリに反映

```bash
$ git fetch -p
```

※`-p`は`--prune`、削除されたリモートブランチについてローカルの追跡ブランチも削除するオプション

mainブランチの最新化

```bash
$ git checkout main
$ git pull --rebase
```

`develop`ブランチの最新化(次に作業をする際は、最新の`main`ブランチの先頭から`develop`ブランチを生やす)

```bash
$ git checkout develop
$ git rebase main
```

> ◎マージ後不要になったブランチについて、リモートリポジトリ上は削除されるがローカルリポジトリ上は自動的に削除されないため、`git branch -D <不要になったブランチ名>`で適宜削除する

### ◆issue対応

> ◎1issueにつき1ブランチ（`feature/<issueのID`）

> ◎コミットメッセージの書式は「f`eature/<issueのID> <メッセージ本文(実装内容のサマリ)>`」

> ◎issue対応が完了しPRを作成する際は、「closes #<対応したissueのID>」のコメントをつける（マージされた際に当該`issue`が自動で`close`される）

### ◆他ブランチの取込

```bash
$ git cherry-pick <取り込みたいコミットID>
```

◎<取り込みたいコミットID>のコミットが現在のブランチの先頭に追加される
◎コミットIDはGitGraph上や`git log`コマンドで確認する

## コードの品質均一化に向けた拡張機能

### ◆Prettierの導入

- VSCodeに、拡張機能`Prettier - Code formatter`をインストール
- `/.vscode`ディレクトリを作成し、`settings.json`を作成（現場のルールを確認）
- `$ npm i -D prettier@latest`を実施
- `/package.json`を編集
- `/.prettierrc`ファイルを作成

> ◎アプリの実行やビルド時に、ずれているファイルを自動的に整形できるようになる

### ◆ESLintの導入

- VSCodeの拡張機能の`ESLint`をインストール
- `/package.json`の`scripts.lint`を編集

> ◎任意のファイルでエラーが発生している際、`npm run lint`でエラーが発生し、`npm run build`や`npm run dev`が途中で止まるようになる

# Gitポイントまとめ

### ◆作業前

> ◎基準となるブランチが最新化されているかを確認する

基準となるブランチに移り、 `git fetch -p`⇒ `git pull --rebase`を行うと、ローカルリポジトリの基準ブランチの内容が、最新のリモートリポジトリの基準ブランチの内容に上書きされる。その後、 `git checkout -b <作業ブランチ>`を実行する

※古いままの基準ブランチだと、デグレの可能性あり

> ◎ブランチのIDを確認する

飯田橋ではRedmine（タスク管理ツール）を使用。Redmine上でチケットを起票し、そのチケットIDをもとにブランチ名が決定される。

GitHub上ではissueを作成してそのIDでブランチ名を決めていく。

- 例) #2のissueであれば、これに対応するブランチ名は `feature/2`

### ◆作業中/後

> ◎基準となるブランチの状態を確認する

PR/MRを提出する前に、基準ブランチの状態をもう一度確認。
作業ブランチが遅れている場合、 `rebase`を通じて最新の基準ブランチから作業ブランチを生やすように修正する。`conflict`もこの時に解消。

> ◎PR/MRには対応内容を必ず記載する

PRの`description`に「今回の作業ブランチで何を実装したか?」をできるだけ詳細に記載。
飯田橋のRedmineでも、対応内容やレビュワーの設定、レビュワーへの質問事項などを記載。
