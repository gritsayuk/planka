export class Constants {

  static readonly DefaultListExr = [{
    nameComplexExr: "Simple",
    standart: true,
    allTime: 30000,
    progressNum: 2,
    progressPer: 2,
    pause: 3,
    Exr: [{
      text: "Simple",
      time: 30000,
      percent: 100,
      timeStr: "2000-01-01T00:00:30Z",
      type: "Simple",
      imageExr: "../../assets/Exr/exr-simple.png"
    }
    ]
  }, {
    nameComplexExr: "Simple Left",
    standart: true,
    allTime: 30000,
    progressNum: 2,
    progressPer: 2,
    pause: 3,
    Exr: [{
      text: "Simple",
      time: 15000,
      percent: 50,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Simple",
      imageExr: "../../assets/Exr/exr-simple.png"
    },{
      text: "Left",
      time: 15000,
      percent: 50,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Left",
      imageExr: "../../assets/Exr/exr-left.png"
    },
    ]
  }, {
    nameComplexExr: "Simple All",
    standart: true,
    allTime: 60000,
    progressNum: 2,
    progressPer: 2,
    pause: 3,
    Exr: [{
      text: "Cubit",
      time: 15000,
      percent: 25,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Cubit",
      imageExr: "../../assets/Exr/exr-cubit.png"
    },{
      text: "Right",
      time: 15000,
      percent: 25,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Right",
      imageExr: "../../assets/Exr/exr-right.png"
    },{
      text: "Left",
      time: 15000,
      percent: 25,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Left",
      imageExr: "../../assets/Exr/exr-left.png"
    },{
      text: "Simple",
      time: 15000,
      percent: 25,
      timeStr: "2000-01-01T00:00:15Z",
      type: "Simple",
      imageExr: "../../assets/Exr/exr-simple.png"
    }
    ]
  }];
  
  static readonly ListExr = [{
    text: 'Simple',
    type: 'Simple',
    time: 15000,
    imageExr: '../../assets/Exr/exr-simple.png',
    icon: 'exr-simple',
  }, {
    text: 'Left',
    type: 'Left',
    time: 15000,
    imageExr: '../../assets/Exr/exr-left.png',
    icon: 'exr-left',

  }, {
    text: 'Right',
    type: 'Right',
    time: 15000,
    imageExr: '../../assets/Exr/exr-right.png',
    icon: 'exr-right',
  }, {
    text: 'Cubit',
    type: 'Cubit',
    time: 15000,
    imageExr: '../../assets/Exr/exr-cubit.png',
    icon: 'exr-cubit',
  }]
}
