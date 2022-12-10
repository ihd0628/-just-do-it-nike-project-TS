interface StandardObject {
  [key: string]: string;
}

interface CheckList {
  [key: string]: number[];
}

const standardObject: StandardObject = {
  신상품순: 'releaseDate desc',
  판매순: 'salescount desc',
  '리뷰 많은 순': 'reviewcount desc',
  할인순: 'discountRate desc',
  '높은 가격순': 'price desc',
  '낮은 가격순': 'price asc',
};

class GetQueryString {
  public queryString: string;

  constructor(
    selectedSizeInput: Array<string>,
    selectedColorInput: Array<string>,
    checkListInput: CheckList,
    offsetInput: number,
    limitInput: number,
    sortStandardInput: string
  ) {
    let quertString = '';
    quertString += GetQueryString.getSortOptionString(
      offsetInput,
      limitInput,
      sortStandardInput
    );
    quertString += GetQueryString.selectSizeGetterForUrl(selectedSizeInput);
    quertString += GetQueryString.selectColorGetterForUrl(selectedColorInput);
    quertString += GetQueryString.checkListGetterForUrl(checkListInput);

    this.queryString = quertString;
  }

  static selectSizeGetterForUrl(selectedSizeInput: Array<string>) {
    let selectSizeForUrl = '';
    selectedSizeInput.forEach(size => {
      selectSizeForUrl += `size=${size}&`;
    });
    return selectSizeForUrl;
  }

  static selectColorGetterForUrl(selectedColorInput: Array<string>) {
    let selectColorForUrl = '';
    selectedColorInput.forEach(color => {
      selectColorForUrl += `color=${color}&`;
    });
    return selectColorForUrl;
  }

  static checkListGetterForUrl(checkListInput: CheckList) {
    let checkListForUrl = '';
    const checkListNames = Object.keys(checkListInput);
    checkListNames.forEach(checkListName => {
      checkListInput[checkListName].forEach(checkedList => {
        checkListForUrl += `${checkListName}=${checkedList}&`;
      });
    });
    return checkListForUrl;
  }

  static getSortOptionString(
    offsetInput: number,
    limitInput: number,
    sortStandardInput: string
  ) {
    const sortStandardForSubmit = standardObject[sortStandardInput];
    return `offset=${offsetInput}&limit=${limitInput}&sort=${sortStandardForSubmit}&`;
  }
}

module.exports = GetQueryString;
