import MarkDownIt from 'markdown-it'
import WriteFileP from "write-file-p";
import nluData from '../state/nlu_data.md';
import testData from '../state/testData.json';

export default function () {
    testData.rasa_nlu_data.common_examples.map(e => {
        let {text, intent, entities} = e
        let createIntent = "## intent:" + intent
        console.log(createIntent)
        if (entities.length > 0) {
            entities.map(e => {
                let keyword = `[${text.slice(e.start, e.end)}]`
                let entity = `(${e.entity})`
                let replaceWord = "` " + text.replace(e.value, keyword) + entity
                let md = new MarkDownIt()
                WriteFileP(nluData, md.render(replaceWord), (err, data) => {
                    console.log(err || data);
                });
            })
        }
    })
}