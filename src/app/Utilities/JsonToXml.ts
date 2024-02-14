import * as JsonToXML from 'js2xmlparser';
import * as Xml2js from 'xml2js';

export function convertXML(rootElement: string, object: any) {
  let options = {
    format: {
      doubleQuotes: true,
      pretty: false
    },
    declaration: {
      include: false
    }
  }

  var result = JsonToXML.parse(rootElement, object, options);
  return result;
}

export function convertStringToJson(xmlStr: string): any {
  var result;
  var parser = new Xml2js.Parser();
  parser.parseString(xmlStr, (error: any, r: any) => { result = r });
  return result;
}
