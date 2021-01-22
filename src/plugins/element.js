// import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)
// 上面是完整引入，下面是按需引入

import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import {
  Pagination,
  Dialog,
  Menu,
  MenuItem,
  MenuItemGroup,
  Input,
  Radio,
  Checkbox,
  Select,
  Button,
  Table,
  TableColumn,
  Link,
  DatePicker,
  Form,
  FormItem,
  Tabs,
  Tag,
  Icon,
  Option,
  Row,
  RadioGroup,
  Col,
  Upload,
  Card,
  Step,
  Cascader,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Link)
Vue.use(DatePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Option)
Vue.use(Row)
Vue.use(RadioGroup)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Step)
Vue.use(Cascader)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
