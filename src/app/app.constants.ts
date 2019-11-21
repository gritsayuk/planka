export class Constants {

  static readonly DefaultListExr = [{
    nameComplexExr: "Simple",
    Exr: [{
      time: 30000,
      type: "PlankaSimple",
      imageExr: "../../assets/Exr/exr-simple.png"
    }
    ]
  }, {
    nameComplexExr: "Simple Left",
    Exr: [{
      time: 15000,
      type: "PlankaSimple",
      imageExr: "../../assets/Exr/exr-simple.png"
    },{
      time: 15000,
      type: "PlankaLeft",
      imageExr: "../../assets/Exr/exr-left.png"
    },
    ]
  }, {
    nameComplexExr: "Simple All",
    Exr: [{
      time: 15000,
      type: "PlankaSimple",
      imageExr: "../../assets/Exr/exr-simple.png"
    },{
      time: 15000,
      type: "PlankaRigth",
      imageExr: "../../assets/Exr/exr-right.png"
    },{
      time: 15000,
      type: "PlankaLeft",
      imageExr: "../../assets/Exr/exr-left.png"
    },{
      time: 15000,
      type: "PlankaCubit",
      imageExr: "../../assets/Exr/exr-cubit.png"
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
