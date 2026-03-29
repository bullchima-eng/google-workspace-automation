// Googleフォーム自動応答スクリプト
// 作成者：橘 篤史 (bullchima-eng)
// 機能：フォーム送信時に自動返信メールを送信

var SENDER_NAME = "橘 篤史";
var REPLY_SUBJECT = "【自動返信】お問い合わせを受け付けました";

function onFormSubmit(e) {
  try {
    var response = e.response;
    var senderEmail = response.getRespondentEmail();
    var itemResponses = response.getItemResponses();
    var answers = {};
    for (var i = 0; i < itemResponses.length; i++) {
      var item = itemResponses[i];
      answers[item.getItem().getTitle()] = item.getResponse();
    }
    var senderName = answers["お名前"] || answers["名前"] || "お客様";
    sendAutoReply(senderEmail, senderName);
    Logger.log("送信完了: " + senderEmail);
  } catch (error) {
    Logger.log("エラー: " + error.toString());
  }
}

function sendAutoReply(toEmail, senderName) {
  if (!toEmail) return;
  var body = senderName + " 様\n\n"
    + "お問い合わせありがとうございます。\n"
    + "3営業日以内にご連絡いたします。\n\n"
    + SENDER_NAME;
  GmailApp.sendEmail(toEmail, REPLY_SUBJECT, body, { name: SENDER_NAME });
}

function testSendReply() {
  sendAutoReply(Session.getActiveUser().getEmail(), "テストユーザー");
  Logger.log("テスト送信完了");
}
