#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const templatesPath = path.resolve(__dirname, './templates')
// 读取模板中的文件夹
fs.readdir(templatesPath, (err, names) => {
    if (err) return console.error('文件读取失败：', err)

    // 提示用户操作
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'template',
                message: '选择要创建的项目类型',
                choices: [...names]
            },
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称',
                validate: value => {
                    return !!value
                }
            },
        ])
        .then(res => {
            // console.log('res', res)
            const { template, name } = res
            const templatePath = path.resolve(templatesPath, template)
            const currentDir = path.resolve('./', name)
            // 判断目录是否存在
            try {
                fs.statSync(currentDir)
                return console.log('项目目录已存在，请使用其他项目名称')
            } catch (error) { }

            // 创建目录
            fs.mkdirSync(currentDir)

            // 进行递归的文件复制
            const readdir = (filePath) => {
                fs.readdir(filePath, (err2, names2) => {
                    if (err2) return console.log('err', err2)

                    // console.log('names2', names2)

                    names2.forEach(fileName => {
                        const subFilePath = path.resolve(filePath, fileName)

                        // console.log('subFilePath', subFilePath)

                        // 判断是否为文件夹
                        fs.stat(subFilePath, (err3, stats) => {
                            const copyPath = path.relative(templatePath, subFilePath)
                            const dirPath = path.resolve(currentDir, copyPath)
                            // 是文件夹
                            if (stats.isDirectory()) {
                                // 创建文件夹
                                fs.mkdir(dirPath, (err4) => {
                                    if (err4) console.error('mkdir error:', err4)
                                    else {
                                        // 递归读取
                                        readdir(subFilePath)
                                    }
                                })
                            }
                            // 文件
                            else {
                                // 拷贝
                                fs.copyFile(subFilePath, dirPath, (err4) => {
                                    if (err4) console.error('copy error:', err4)
                                    else console.log('copy:', copyPath)
                                })
                            }
                        })
                    })
                })
            }

            readdir(templatePath)
        })
})
