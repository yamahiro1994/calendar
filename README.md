# README

## ホームライフサポートアプリ

### 本番環境URL
https://mycalendar-app.herokuapp.com/

### テストユーザー
* 名前：aaa
* パスワード：111111

### 開発環境
* Haml＆Sass
* JavaScript
* jQuery
* Ruby
* Ruby on Rails
* MySQL
* PostgreSQL
* Heroku

# 企画背景
今後日本は高齢化によって、要介護者が増える一方、介護施設や介護士が不足し、施設に入所できない『介護難民』が増加していく。
そのため高齢者の独居世帯が増えていくことが予測され、今後は看護や介護の支援を受けながら自宅で生活をしていくことが求められる。
高齢者の生活をサポートできるアプリが必要だと考えたことが制作した経緯になります。
毎日の予定を管理して音声で通知することで、物忘れ防止などのサポートが可能なアプリを製作中です。

## このアプリで出来ること
* ユーザー登録
* ログイン&ログアウト
* パスワード再設定
* カレンダー表示
* 月・週・日・予定リストで表示を変更
* イベント追加・保存
* イベントを選択した色で表示

## ユーザー登録
![sign in - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82155131-908ac880-98ad-11ea-8b7d-d826d3c227c3.png)
gem file 『devise』を導入し名前、メールアドレス、パスワードでユーザー登録を可能にしました。
<br>
<br>
## ログイン
![log in - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82155124-82d54300-98ad-11ea-84ad-3ad8393b6763.png)
ログインは手間を少なくする為に名前とパスワードでログイン可能にしました。
<br>
<br>
## パスワード再設定
![re-pass - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82155144-b0ba8780-98ad-11ea-825e-71fa7225debd.png)
ネットを利用したことがない方でも分かるように英語ではなく、できるだけ日本語を使用するようにしました。
<br>
<br>
## カレンダー（月表示）
![top-png - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82154781-3852c700-98ab-11ea-8352-e8f973c0a453.png)
月表示がメインページとなります。gem file「fullcalendar」を導入しfullcalendar-4.4.0のライブラリーを使用してカレンダーを表示しました。<br>土日やイベントに色をつけたことで視覚的に分かりやすくしています。
<br>
<br>
## カレンダー（週表示）
![week - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82154851-a8614d00-98ab-11ea-84c8-a2d7ccded09a.png)
カレンダー上の週ボタンを押すと、１週間の予定を表示し時間を確認しやすくなります。
<br>
<br>
## カレンダー（日表示）
![day - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82154885-de9ecc80-98ab-11ea-9700-cd0434bcaeeb.png)
カレンダー上の日ボタンを押すと、当日の予定を表示します。
<br>
<br>
## カレンダー（予定リスト表示）
![list - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82154917-10179800-98ac-11ea-84b0-777e5b1e59ad.png)
カレンダー上の予定リストボタンを押すと、予定をリスト表示します。
<br>
<br>
## イベントの追加
![add-events - Calendar - mycalendar-app herokuapp com](https://user-images.githubusercontent.com/61701275/82155040-1e19e880-98ad-11ea-9214-cd2934df9851.png)
日付をクリックすると予定入力フォームがモーダルウィンドウで表示されるようJSで実装しました。<br>予定のタイトル、開始時間と終了時間、予定の色、メモを入力して予定追加が可能。
<br>
<br>
## 今後アップデート予定
* イベントの編集・削除
* イベント追加時に定期的なイベントか選択
* 音声合成API導入（イベントの音声読み上げ）
* SkyWayAPI導入（ビデオチャット機能）
* Googleカレンダーと同期
* ドラッグ&ドロップでイベントの日付け変更
* イベント検索
* 問い合わせ
<br>

## データベース設計
### usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false, unipue: true|
|password|string|null: false|
### Association
- has_many :events

### eventsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|start|datatime|
|end|datatime|
|color|string|
|allday|integer|
|memo|text|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
