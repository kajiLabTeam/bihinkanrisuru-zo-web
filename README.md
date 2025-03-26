# 備品管理システムWebクライアント

> デプロイ先：https://bihinkanrisuru-zo-web.vercel.app/

## 実行方法

### 開発環境

#### 0. 準備

##### バックエンドサーバの起動

[備品管理システムバックエンドサーバ](https://github.com/kajiLabTeam/bihinkanrisuru-zo-server)の`README.md`を参照

##### 環境変数の追加

[こちら](https://kjlb.esa.io/posts/7373)を参照してください

#### 1. パッケージのインストール

```shell
yarn install
```

#### 2. 開発用サーバの起動

```shell
yarn dev
```

`http://localhost:5713`にアクセス

### 本番環境

> [!IMPORTANT]
> 梶研のGoogleアカウントにログインした上での方法です
>
> 管理画面URL：https://vercel.com/kjkbs-projects/bihinkanrisuru-zo-web

#### 1. このリポジトリのdevブランチに反映したい内容をプッシュする

#### 2. 梶研個人アカウントで[フォークされたリポジトリ](https://github.com/kjlb/bihinkanrisuru-zo-web)を更新する

`Sync fork`の部分に更新する用のボタンが出てくるのでそれをクリック

<img width="361" alt="スクリーンショット 2025-03-26 21 27 41" src="https://github.com/user-attachments/assets/01f6d0d1-4f11-40ec-8457-d7d10fd61e1a" />

#### 3. 待つ

あとは`Vercel`が勝手に変更内容を本番に反映させてくれます
