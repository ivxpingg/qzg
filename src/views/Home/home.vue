<template>
    <div class="home-container" ref="home">
        <vUploader @on-uploadSuccess="onUploadSuccess" @on-removeFile="onRemoveFile" >

            <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
        </vUploader>
        <!--<Upload action="//jsonplaceholder.typicode.com/posts/">-->
            <!--<Button type="primary" icon="ios-cloud-upload-outline">Upload files</Button>-->
        <!--</Upload>-->
        <!--<Button>Default</Button>-->
        <!--<Button type="primary" @click="test">Primary</Button>-->
        <!--<Button type="dashed">Dashed</Button>-->
        <!--<Button type="text">Text</Button>-->
        <!--<br><br>-->
        <!--<Button type="info">Info</Button>-->
        <!--<Button type="success">Success</Button>-->
        <!--<Button type="warning">Warning</Button>-->
        <!--<Button type="error">Error</Button>-->
        <!--<div>-->
            <!--<Button type="default" ghost>Default</Button>-->
            <!--<Button type="primary" ghost>Primary</Button>-->
            <!--<Button type="dashed" ghost>Dashed</Button>-->
            <!--<Button type="text" ghost>Text</Button>-->
            <!--<Button type="info" ghost>Info</Button>-->
            <!--<Button type="success" ghost>Success</Button>-->
            <!--<Button type="warning" ghost>Warning</Button>-->
            <!--<Button type="error" ghost>Error</Button>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Icon</h1>-->
            <!--<i class="ivu-icon ivu-icon-ios-checkmark"></i>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Card</h1>-->
            <!--<Card style="width:350px">-->
                <!--<p slot="title">-->
                    <!--<Icon type="ios-film-outline"></Icon>-->
                    <!--Classic film-->
                <!--</p>-->
                <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
                    <!--<Icon type="ios-loop-strong"></Icon>-->
                    <!--Change-->
                <!--</a>-->
                <!--<ul>-->
                    <!--<li v-for="item in randomMovieList" :key="item.name">-->
                        <!--<a :href="item.url" target="_blank">{{ item.name }}</a>-->
                        <!--<span>-->
                    <!--<Icon type="ios-star" v-for="n in 4" :key="n"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>-->
                    <!--{{ item.rate }}-->
                <!--</span>-->
                    <!--</li>-->
                <!--</ul>-->
            <!--</Card>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Collapse 折叠面板</h1>-->
            <!--<Collapse v-model="value1">-->
                <!--<Panel name="1">-->
                    <!--史蒂夫·乔布斯-->
                    <!--<p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>-->
                <!--</Panel>-->
                <!--<Panel name="2">-->
                    <!--斯蒂夫·盖瑞·沃兹尼亚克-->
                    <!--<p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>-->
                <!--</Panel>-->
                <!--<Panel name="3">-->
                    <!--乔纳森·伊夫-->
                    <!--<p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>-->
                <!--</Panel>-->
            <!--</Collapse>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Split 面板分割</h1>-->
            <!--<div class="demo-split">-->
                <!--<Split v-model="split1">-->
                    <!--<div slot="left" class="demo-split-pane">-->
                        <!--Left Pane-->
                    <!--</div>-->
                    <!--<div slot="right" class="demo-split-pane">-->
                        <!--Right Pane-->
                    <!--</div>-->
                <!--</Split>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Divider 分割线</h1>-->
            <!--<p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>-->
            <!--<Divider />-->
            <!--<p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>-->
            <!--<Divider>With Text</Divider>-->
            <!--<p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>-->
            <!--<Divider dashed />-->
            <!--<p>Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman, chief executive officer, and a co-founder of Apple Inc.</p>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Cell 单元格</h1>-->
            <!--<div style="padding: 10px;background: #f8f8f9">-->
                <!--<Card title="Options" icon="ios-options" :padding="0" shadow style="width: 300px;">-->
                    <!--<CellGroup>-->
                        <!--<Cell title="Only show titles" />-->
                        <!--<Cell title="Display label content" label="label content" />-->
                        <!--<Cell title="Display right content" extra="details" />-->
                        <!--<Cell title="Link" extra="details" to="/components/button" />-->
                        <!--<Cell title="Open link in new window" to="/components/button" target="_blank" />-->
                        <!--<Cell title="Disabled" disabled />-->
                        <!--<Cell title="Selected" selected />-->
                        <!--<Cell title="With Badge" to="/components/badge">-->
                            <!--<Badge :count="10" slot="extra" />-->
                        <!--</Cell>-->
                        <!--<Cell title="With Switch">-->
                            <!--<i-switch v-model="switchValue" slot="extra" />-->
                        <!--</Cell>-->
                    <!--</CellGroup>-->
                <!--</Card>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1></h1>-->
            <!--<Tabs value="name1" :animated="false">-->
                <!--<TabPane label="标签一" name="name1">标签一的内容</TabPane>-->
                <!--<TabPane label="标签二" name="name2">标签二的内容</TabPane>-->
                <!--<TabPane label="标签三" name="name3">标签三的内容</TabPane>-->
            <!--</Tabs>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Dropdown 下拉菜单</h1>-->
            <!--<Dropdown transfer trigger="click">-->
                <!--<a href="javascript:void(0)">-->
                    <!--下拉菜单-->
                    <!--<Icon type="ios-arrow-down"></Icon>-->
                <!--</a>-->
                <!--<DropdownMenu slot="list">-->
                    <!--<DropdownItem>驴打滚</DropdownItem>-->
                    <!--<DropdownItem>炸酱面</DropdownItem>-->
                    <!--<DropdownItem disabled>豆汁儿</DropdownItem>-->
                    <!--<DropdownItem>冰糖葫芦</DropdownItem>-->
                    <!--<DropdownItem divided>北京烤鸭</DropdownItem>-->
                <!--</DropdownMenu>-->
            <!--</Dropdown>-->
            <!--<Dropdown style="margin-left: 20px" transfer trigger="click">-->
                <!--<Button type="primary">-->
                    <!--下拉菜单-->
                    <!--<Icon type="ios-arrow-down"></Icon>-->
                <!--</Button>-->
                <!--<DropdownMenu slot="list">-->
                    <!--<DropdownItem>驴打滚</DropdownItem>-->
                    <!--<DropdownItem>炸酱面</DropdownItem>-->
                    <!--<DropdownItem disabled>豆汁儿</DropdownItem>-->
                    <!--<DropdownItem>冰糖葫芦</DropdownItem>-->
                    <!--<DropdownItem divided>北京烤鸭</DropdownItem>-->
                <!--</DropdownMenu>-->
            <!--</Dropdown>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Page 分页</h1>-->
            <!--<Page :total="100" />-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Breadcrumb 面包屑</h1>-->
            <!--<Breadcrumb>-->
                <!--<BreadcrumbItem to="/">Home</BreadcrumbItem>-->
                <!--<BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>-->
                <!--<BreadcrumbItem>Breadcrumb</BreadcrumbItem>-->
            <!--</Breadcrumb>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Badge 徽标数</h1>-->
            <!--<Badge dot>-->
                <!--<a href="#" class="demo-badge"></a>-->
            <!--</Badge>-->
            <!--<Badge dot>-->
                <!--<Icon type="ios-notifications-outline" size="26"></Icon>-->
            <!--</Badge>-->
            <!--<Badge dot>-->
                <!--<a href="#">可以是一个链接</a>-->
            <!--</Badge>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Steps 步骤条</h1>-->
            <!--<Steps :current="1">-->
                <!--<Step title="已完成" content="这里是该步骤的描述信息"></Step>-->
                <!--<Step title="进行中" content="这里是该步骤的描述信息"></Step>-->
                <!--<Step title="待进行" content="这里是该步骤的描述信息"></Step>-->
                <!--<Step title="待进行" content="这里是该步骤的描述信息"></Step>-->
            <!--</Steps>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>LoadingBar 加载进度条</h1>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Input 输入框</h1>-->
            <!--<div>-->
                <!--<Input search placeholder="Enter something..." />-->
                <!--<Input search enter-button placeholder="Enter something..." />-->
                <!--<Input search enter-button="Search" placeholder="Enter something..." />-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Radio 单选框</h1>-->
            <!--<Radio v-model="disabledSingle" disabled>Radio</Radio>-->
            <!--<RadioGroup v-model="disabledGroup">-->
                <!--<Radio label="金斑蝶" disabled></Radio>-->
                <!--<Radio label="爪哇犀牛"></Radio>-->
                <!--<Radio label="印度黑羚"></Radio>-->
            <!--</RadioGroup>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Checkbox 多选框</h1>-->
            <!--<CheckboxGroup v-model="social">-->
                <!--<Checkbox label="twitter">-->
                    <!--<Icon type="logo-twitter"></Icon>-->
                    <!--<span>Twitter</span>-->
                <!--</Checkbox>-->
                <!--<Checkbox label="facebook">-->
                    <!--<Icon type="logo-facebook"></Icon>-->
                    <!--<span>Facebook</span>-->
                <!--</Checkbox>-->
                <!--<Checkbox label="github">-->
                    <!--<Icon type="logo-github"></Icon>-->
                    <!--<span>Github</span>-->
                <!--</Checkbox>-->
                <!--<Checkbox label="snapchat">-->
                    <!--<Icon type="logo-snapchat"></Icon>-->
                    <!--<span>Snapchat</span>-->
                <!--</Checkbox>-->
            <!--</CheckboxGroup>-->
            <!--<CheckboxGroup v-model="fruit">-->
                <!--<Checkbox label="香蕉"></Checkbox>-->
                <!--<Checkbox label="苹果"></Checkbox>-->
                <!--<Checkbox label="西瓜"></Checkbox>-->
            <!--</CheckboxGroup>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Select 选择器</h1>-->
            <!--<Select v-model="model5" disabled style="width:200px">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
            <!--</Select>-->
            <!--<Select v-model="model6" style="width:200px">-->
                <!--<Option value="beijing">New York</Option>-->
                <!--<Option value="shanghai" disabled>London</Option>-->
                <!--<Option value="shenzhen">Sydney</Option>-->
            <!--</Select>-->
            <!--<Select v-model="model10" multiple style="width:260px">-->
                <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
            <!--</Select>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>DatePicker 日期选择器</h1>-->
            <!--<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>-->
            <!--<DatePicker type="daterange" split-panels placeholder="Select date" style="width: 200px"></DatePicker>-->
            <!--<DatePicker type="date" multiple placeholder="Select date" style="width: 300px"></DatePicker>-->

            <TimePicker type="time" placeholder="Select time" style="width: 168px"></TimePicker>
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Form 表单</h1>-->
            <!--<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">-->
                <!--<FormItem label="Name" prop="name">-->
                    <!--<Input v-model="formValidate.name" placeholder="Enter your name"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="E-mail" prop="mail">-->
                    <!--<Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>-->
                <!--</FormItem>-->
                <!--<FormItem label="City" prop="city">-->
                    <!--<Select v-model="formValidate.city" placeholder="Select your city">-->
                        <!--<Option value="beijing">New York</Option>-->
                        <!--<Option value="shanghai">London</Option>-->
                        <!--<Option value="shenzhen">Sydney</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <!--<FormItem label="Date">-->
                    <!--<Row>-->
                        <!--<Col span="11">-->
                            <!--<FormItem prop="date">-->
                                <!--<DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="2" style="text-align: center">-</Col>-->
                        <!--<Col span="11">-->
                            <!--<FormItem prop="time">-->
                                <!--<TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</FormItem>-->
                <!--<FormItem label="Gender" prop="gender">-->
                    <!--<RadioGroup v-model="formValidate.gender">-->
                        <!--<Radio label="male">Male</Radio>-->
                        <!--<Radio label="female">Female</Radio>-->
                    <!--</RadioGroup>-->
                <!--</FormItem>-->
                <!--<FormItem label="Hobby" prop="interest">-->
                    <!--<CheckboxGroup v-model="formValidate.interest">-->
                        <!--<Checkbox label="Eat"></Checkbox>-->
                        <!--<Checkbox label="Sleep"></Checkbox>-->
                        <!--<Checkbox label="Run"></Checkbox>-->
                        <!--<Checkbox label="Movie"></Checkbox>-->
                    <!--</CheckboxGroup>-->
                <!--</FormItem>-->
                <!--<FormItem label="Desc" prop="desc">-->
                    <!--<Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
                <!--</FormItem>-->
                <!--<FormItem>-->
                    <!--<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>-->
                    <!--<Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
                <!--</FormItem>-->
            <!--</Form>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Alert 警告提示</h1>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Message 全局提示</h1>-->
            <!--<Button @click="success">Display success prompt</Button>-->
            <!--<Button @click="warning">Display warning prompt</Button>-->
            <!--<Button @click="error">Display error prompt</Button>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Notice 通知提醒</h1>-->
            <!--<p>With desc</p>-->
            <!--<Button @click="info1(false)">Info</Button>-->
            <!--<Button @click="success1(false)">Success</Button>-->
            <!--<Button @click="warning1(false)">Warning</Button>-->
            <!--<Button @click="error1(false)">Error</Button>-->
            <!--<p>Only title</p>-->
            <!--<Button @click="info1(true)">Info</Button>-->
            <!--<Button @click="success1(true)">Success</Button>-->
            <!--<Button @click="warning1(true)">Warning</Button>-->
            <!--<Button @click="error1(true)">Error</Button>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Modal 对话框</h1>-->
            <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
            <!--<Modal-->
                    <!--v-model="modal1"-->
                    <!--title="Common Modal dialog box title"-->
                    <!--@on-ok="ok"-->
                    <!--@on-cancel="cancel">-->
                <!--<p>Content of dialog</p>-->
                <!--<p>Content of dialog</p>-->
                <!--<p>Content of dialog</p>-->
            <!--</Modal>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Tree 树形控件</h1>-->
            <!--<Tree :data="data2" show-checkbox></Tree>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Tooltip 文字提示</h1>-->
            <!--<div class="top">-->
                <!--<Tooltip content="Top Left text" placement="top-start">-->
                    <!--<Button>Top Left</Button>-->
                <!--</Tooltip>-->
                <!--<Tooltip content="Top Center text" placement="top">-->
                    <!--<Button>Top Center</Button>-->
                <!--</Tooltip>-->
                <!--<Tooltip content="Top Right text" placement="top-end">-->
                    <!--<Button>Top Right</Button>-->
                <!--</Tooltip>-->
            <!--</div>-->
            <!--<div class="center">-->
                <!--<div class="center-left">-->
                    <!--<Tooltip content="Left Top text" placement="left-start">-->
                        <!--<Button>Left Top</Button>-->
                    <!--</Tooltip><br><br>-->
                    <!--<Tooltip content="Left Center text" placement="left">-->
                        <!--<Button>Left Center</Button>-->
                    <!--</Tooltip><br><br>-->
                    <!--<Tooltip content="Left Bottom text" placement="left-end">-->
                        <!--<Button>Left Bottom</Button>-->
                    <!--</Tooltip>-->
                <!--</div>-->
                <!--<div class="center-right">-->
                    <!--<Tooltip content="Right Top text" placement="right-start">-->
                        <!--<Button>Right Top</Button>-->
                    <!--</Tooltip><br><br>-->
                    <!--<Tooltip content="Right Center text" placement="right">-->
                        <!--<Button>Right Center</Button>-->
                    <!--</Tooltip><br><br>-->
                    <!--<Tooltip content="Right Bottom text" placement="right-end">-->
                        <!--<Button>Right Bottom</Button>-->
                    <!--</Tooltip>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="bottom">-->
                <!--<Tooltip content="Bottom Left text" placement="bottom-start">-->
                    <!--<Button>Bottom Left</Button>-->
                <!--</Tooltip>-->
                <!--<Tooltip content="Bottom Center text" placement="bottom">-->
                    <!--<Button>Bottom Center</Button>-->
                <!--</Tooltip>-->
                <!--<Tooltip content="Bottom Right text" placement="bottom-end">-->
                    <!--<Button>Bottom Right</Button>-->
                <!--</Tooltip>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Poptip 气泡提示</h1>-->
            <!--<div class="top">-->
                <!--<Poptip title="Title" content="content" placement="top-start">-->
                    <!--<Button>Top Left</Button>-->
                <!--</Poptip>-->
                <!--<Poptip title="Title" content="content" placement="top">-->
                    <!--<Button>Top Center</Button>-->
                <!--</Poptip>-->
                <!--<Poptip title="Title" content="content" placement="top-end">-->
                    <!--<Button>Top Right</Button>-->
                <!--</Poptip>-->
            <!--</div>-->
            <!--<div class="center">-->
                <!--<div class="center-left">-->
                    <!--<Poptip title="Title" content="content" placement="left-start">-->
                        <!--<Button>Left Top</Button>-->
                    <!--</Poptip><br><br>-->
                    <!--<Poptip title="Title" content="content" placement="left">-->
                        <!--<Button>Left Center</Button>-->
                    <!--</Poptip><br><br>-->
                    <!--<Poptip title="Title" content="content" placement="left-end">-->
                        <!--<Button>Left Bottom</Button>-->
                    <!--</Poptip>-->
                <!--</div>-->
                <!--<div class="center-right">-->
                    <!--<Poptip title="Title" content="content" placement="right-start">-->
                        <!--<Button>Right Top</Button>-->
                    <!--</Poptip><br><br>-->
                    <!--<Poptip title="Title" content="content" placement="right">-->
                        <!--<Button>Right Center</Button>-->
                    <!--</Poptip><br><br>-->
                    <!--<Poptip title="Title" content="content" placement="right-end">-->
                        <!--<Button>Right Bottom</Button>-->
                    <!--</Poptip>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="bottom">-->
                <!--<Poptip title="Title" content="content" placement="bottom-start">-->
                    <!--<Button>Bottom Left</Button>-->
                <!--</Poptip>-->
                <!--<Poptip title="Title" content="content" placement="bottom">-->
                    <!--<Button>Bottom Center</Button>-->
                <!--</Poptip>-->
                <!--<Poptip title="Title" content="content" placement="bottom-end">-->
                    <!--<Button>Bottom Right</Button>-->
                <!--</Poptip>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1>Progress 进度条</h1>-->
            <!--<Progress :percent="25" />-->
            <!--<Progress :percent="45" status="active" />-->
            <!--<Progress :percent="65" status="wrong" />-->
            <!--<Progress :percent="100" />-->
            <!--<Progress :percent="25" hide-info />-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1></h1>-->
            <!--&lt;!&ndash;<Spin fix>加载中...</Spin>&ndash;&gt;-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1></h1>-->
            <!--<Table width="550" height="150" :loading="loading" border :columns="columns2" :data="data3">-->
                <!--<span slot="loading">加载中...</span>-->
            <!--</Table>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1></h1>-->
        <!--</div>-->
        <!--<div>-->
            <!--<h1></h1>-->
        <!--</div>-->
    </div>
</template>

<script>
    import vUploader from '../../components/webuploader/webuploader';
    import { mapActions } from 'vuex';
    export default {
        name: 'mhome',
        components: {vUploader},
        data() {
            return {
                movieList: [
                    {
                        name: 'The Shawshank Redemption',
                        url: 'https://movie.douban.com/subject/1292052/',
                        rate: 9.6
                    },
                    {
                        name: 'Leon:The Professional',
                        url: 'https://movie.douban.com/subject/1295644/',
                        rate: 9.4
                    },
                    {
                        name: 'Farewell to My Concubine',
                        url: 'https://movie.douban.com/subject/1291546/',
                        rate: 9.5
                    },
                    {
                        name: 'Forrest Gump',
                        url: 'https://movie.douban.com/subject/1292720/',
                        rate: 9.4
                    },
                    {
                        name: 'Life Is Beautiful',
                        url: 'https://movie.douban.com/subject/1292063/',
                        rate: 9.5
                    },
                    {
                        name: 'Spirited Away',
                        url: 'https://movie.douban.com/subject/1291561/',
                        rate: 9.2
                    },
                    {
                        name: 'Schindler',
                        url: 'https://movie.douban.com/subject/1295124/',
                        rate: 9.4
                    },
                    {
                        name: 'The Legend of 1900',
                        url: 'https://movie.douban.com/subject/1292001/',
                        rate: 9.2
                    },
                    {
                        name: 'WALL·E',
                        url: 'https://movie.douban.com/subject/2131459/',
                        rate: 9.3
                    },
                    {
                        name: 'Inception',
                        url: 'https://movie.douban.com/subject/3541415/',
                        rate: 9.2
                    }
                ],
                randomMovieList: [],
                value1: '1',
                split1: 0.5,
                disabledSingle: true,
                disabledGroup: '爪哇犀牛',
                social: ['facebook', 'github'],
                fruit: ['苹果'],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model5: '',
                model6: '',
                model10: [],
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                },
                modal1: false,
                data2: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100,
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width: 100
                    },
                    {
                        title: 'Province',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: 'City',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    },
                    {
                        title: 'Postcode',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 120,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ],
                loading: false
            }
        },
        mounted () {
            this.changeLimit();
            this.$Loading.start();

            let loginName = 'admin';
            let password = '123456';

            this.handleLogin({ loginName, password }).then(res => {
                this.$Message.success('登錄成功');

            });

        },
        methods: {
            ...mapActions([
                'handleLogin'
            ]),
            test() {
                alert('test');
            },
            changeLimit () {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i<num; i++) {
                        if (temp_array.length>0) {
                            const arrIndex = Math.floor(Math.random()*temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }
                this.randomMovieList = getArrayItems(this.movieList, 5);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            success () {
                this.$Message.success('This is a success tip');
            },
            warning () {
                this.$Message.warning('This is a warning tip');
            },
            error () {
                this.$Message.error('This is an error tip');
            },
            info1 (nodesc) {
                this.$Notice.info({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            success1 (nodesc) {
                this.$Notice.success({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            warning1 (nodesc) {
                this.$Notice.warning({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            error1 (nodesc) {
                this.$Notice.error({
                    title: 'Notification title',
                    desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                });
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },

            onUploadSuccess(response, file, fileList) {

                console.dir(fileList);
            },
            onRemoveFile(file, fileList) {
                console.dir(fileList);

            }
        }
    }
</script>

<style lang="scss">
    .ivu-table-body {
        overflow: auto;
    }

    .home-container {
        .ivu-card ul li span {
            float: right;
            color: #ffac2d;
        }
    }

    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }

    .top,.bottom{
        text-align: center;
    }
    .center{
        width: 300px;
        margin: 10px auto;
        overflow: hidden;
    }
    .center-left{
        float: left;
    }
    .center-right{
        float: right;
    }

    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }

</style>