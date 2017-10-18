/*
    menu - BackColor
*/
import $ from '../../util/dom-core.js'
import DropList from '../droplist.js'

// 构造函数
function BackColor(editor) {
    this.editor = editor
    this.$elem = $('<div class="w-e-menu"><i class="w-e-icon-paint-brush"><i/></div>')
    this.type = 'droplist'
    const config = editor.config || {}
    const colors = config.colors || [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
    ]

    // 当前是否 active 状态
    this._active = false
    let lists = []
    for (let i = 0, leng = colors.length; i < leng; i++) {
        let tempJson = {}
        let str = '<i style="color:' + colors[i] + ';" class="w-e-icon-paint-brush"></i>'
        tempJson.$elem = $(str)
        tempJson.value =  colors[i]
        lists.push(tempJson)
    }
    lists.push({
        $elem: $('<i style="color:#000; font-style: normal">清除</i>'), value: 'rgba(0, 0, 0, 0)' 
    })
    // 初始化 droplist
    this.droplist = new DropList(this, {
        width: 120,
        $title: $('<p>背景色</p>'),
        type: 'inline-block', // droplist 内容以 block 形式展示
        // list: [
        //     { $elem: $('<i style="color:#000000;" class="w-e-icon-paint-brush"></i>'), value: '#000000' },
        //     { $elem: $('<i style="color:#eeece0;" class="w-e-icon-paint-brush"></i>'), value: '#eeece0' },
        //     { $elem: $('<i style="color:#1c487f;" class="w-e-icon-paint-brush"></i>'), value: '#1c487f' },
        //     { $elem: $('<i style="color:#4d80bf;" class="w-e-icon-paint-brush"></i>'), value: '#4d80bf' },
        //     { $elem: $('<i style="color:#c24f4a;" class="w-e-icon-paint-brush"></i>'), value: '#c24f4a' },
        //     { $elem: $('<i style="color:#8baa4a;" class="w-e-icon-paint-brush"></i>'), value: '#8baa4a' },
        //     { $elem: $('<i style="color:#7b5ba1;" class="w-e-icon-paint-brush"></i>'), value: '#7b5ba1' },
        //     { $elem: $('<i style="color:#46acc8;" class="w-e-icon-paint-brush"></i>'), value: '#46acc8' },
        //     { $elem: $('<i style="color:#f9963b;" class="w-e-icon-paint-brush"></i>'), value: '#f9963b' },
        //     { $elem: $('<i style="color:#ffffff;" class="w-e-icon-paint-brush"></i>'), value: '#ffffff' }
        // ],
        list: lists,
        onClick: (value) => {
            // 注意 this 是指向当前的 BackColor 对象
            this._command(value)
        }
    })
}

// 原型
BackColor.prototype = {
    constructor: BackColor,

    // 执行命令
    _command: function (value) {
        const editor = this.editor
        editor.cmd.do('backColor', value)
    }
}

export default BackColor