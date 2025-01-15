oS.Init({
  PName: [oSunFlower, oPotatoMine, oChomper],
  ZName: [oZombie, oPoleVaultingZombie, oBucketheadZombie, oDancingZombie, oBackupDancer],
  PicArr: ["images/interface/background2.jpg", "images/interface/trophy.png", "images/interface/Stripe.png"],
  backgroundImage: "images/interface/background2.jpg",
  ShowScroll: false,
  SunNum: 150,
  BrainsNum: 5,
  ProduceSun: false,
  CardKind: 1,
  LevelName: "解谜模式：僵尸摇摆",
  LoadMusic: function () {
    NewMusic("Mountains.swf")
  },
  StartGameMusic: "Mountains.swf",
  InitLawnMower: function () {
    var a = 6;
    while (--a) {
      CustomSpecial(oBrains, a, -1)
    }
  },
  ArP: {
    ArC: [1, 5],
    ArR: [1, 5],
    Auto: 1,
    P: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2]
  },
  RiddleAutoGrow: function () {
    var k = oS.ArP,
      f = k.ArC,
      j = k.ArR,
      e = k.P,
      d = oS.PName,
      c, g = f[0],
      b = f[1],
      i = j[0],
      h = j[1],
      a;
    if (k.Auto) {
        while (i <= h) {
          CustomSpecial(oBrains, i, 0);
          for (a = g; a <= b; a++) {
            CustomSpecial(d[e[c = Math.floor(Math.random() * e.length)]], i, a, 1);
            e.splice(c, 1)
          }++i
        }
      }
    NewImg("iStripe", "images/interface/Stripe.png", "left:" + (GetX1X2(6)[0] - 11) + "px;top:65px", EDAll)
  },
  StartGame: function () {
    oP.Monitor();
    BeginCool();
    SetVisible($("dFlagMeter"), $("dFlagMeterContent"), $("dTop"));
    oS.RiddleAutoGrow();
    !oS.Silence && NewMusic("Mountains.swf")
  }
}, 0, {
  AutoSelectCard: function () {
    var c = oS.ArCard,
      b = -1,
      a = c.length - 1;
    while (++b < a) {
        SelectCard(c[b].prototype.EName)
      }
  }
});