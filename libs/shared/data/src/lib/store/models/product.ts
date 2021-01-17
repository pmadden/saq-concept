
export interface Product {
  raw: {
    systitle: string;
    tpbouchon: string;
    tpcategorie: string;
    tpcepagesplitgroup: string;
    tpcodesaq: string;
    tpcodecup: string;
    tpcompagniedescription: string;
    tpcontenant: string;
    tpcouleur: string;
    tpdisponibilite: string;
    tpenspecial: string;
    tpformat: string;
    tppastilledegout: string;
    tppays: string;
    tpprixinitial: string;
    tpprixnormal: string;
    tpprixrabais: string;
    tpproducteur: string;
    tpregion: string;
    tpthumbnailuri: string;
  };
}

export class Product implements Product {
  raw: {
    systitle: string;
    tpbouchon: string;
    tpcategorie: string;
    tpcepagesplitgroup: string;
    tpcodesaq: string;
    tpcodecup: string;
    tpcompagniedescription: string;
    tpcontenant: string;
    tpcouleur: string;
    tpdisponibilite: string;
    tpenspecial: string;
    tpformat: string;
    tppastilledegout: string;
    tppays: string;
    tpprixinitial: string;
    tpprixnormal: string;
    tpprixrabais: string;
    tpproducteur: string;
    tpregion: string;
    tpthumbnailuri: string;
  };

  constructor() {
    this.raw = {
      systitle: '',
      tpbouchon: '',
      tpcategorie: '',
      tpcepagesplitgroup: '',
      tpcodesaq: '',
      tpcodecup: '',
      tpcompagniedescription: '',
      tpcontenant: '',
      tpcouleur: '',
      tpdisponibilite: '',
      tpenspecial: '',
      tpformat: '',
      tppastilledegout: '',
      tppays: '',
      tpprixinitial: '',
      tpprixnormal: '',
      tpprixrabais: '',
      tpproducteur: '',
      tpregion: '',
      tpthumbnailuri: ''
    };
  }
}
