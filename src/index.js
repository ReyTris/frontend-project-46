import { readFileSync } from 'fs'
import _ from 'lodash'
import path from 'path'

const getFilePath = (filename) => path.resolve(process.cwd(), filename) // получение относительного и абсолютного путей
const readFile = (path) => readFileSync(path, 'utf-8')
const parseJSON = (file) => JSON.parse(file)

const diffInformation = (file1, file2) => {
    const obj1 = parseJSON(readFile(getFilePath(file1)));
    const obj2 = parseJSON(readFile(getFilePath(file2)));

    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    const keys = _.sortBy(_.union(keys1, keys2))

    const result = keys.map((key) => {
        if (!_.has(obj1, key)) {
            return {
                key,
                value: obj2[key],
                type: 'added'
            }
        }
        if (!_.has(obj2, key)) {
            return {
                key,
                value: obj1[key],
                type: 'removed'
            }
        }
        if (obj1[key] === obj2[key]) {
            return {
                key,
                value: obj1[key],
                type: 'unchanged'
            }
        }
        if ((obj1[key] && obj2[key]) && (obj1[key] != obj2[key])) {
            return {
                key,
                type: 'changed',
                oldValue: obj1[key],
                newValue: obj2[key]
            }
        }
    })

    return result
}
export default (filepath1, filepath2) => {     
    const getDiffInformation = diffInformation(filepath1, filepath2)
    const diff = getDiffInformation.map((diff) => {
        const typeDiff = diff.type

        switch (typeDiff) {
            case 'added':
                return `  + ${diff.key}: ${diff.value}`
            case 'removed':
                return `  - ${diff.key}: ${diff.value}`
            case 'unchanged':
                return `    ${diff.key}: ${diff.value}`
            case 'changed':
                return `  - ${diff.key}: ${diff.oldValue} \n  + ${diff.key}: ${diff.newValue}`
        }
    })

    return `{\n${diff.join('\n')}\n}`
}