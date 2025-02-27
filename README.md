# 简易应用——Spring Boot会员管理系统

## Tips
- 2019122
  - 设置 maven，需要在setting里指定
  
        ```
        {
            "maven.executable.path": "C:\\apache-maven-3.3.9-bin\\apache-maven-3.3.9\\bin\\mvn.cmd",
            "java.configuration.maven.userSettings": "C:\\apache-maven-3.3.9-bin\\apache-maven-3.3.9\\conf\\settings.xml"
        }
        ```

- 当前项目的Java版本是1.8
    - 如Intellij，需在 Project里 设为1.8（如果不是的话）
    - 如VSCode，需在Workspace的settings.json指定jvm路径
        ```
        {
            "java.home":"C:\\Program Files\\Java\\jdk1.8.0_221"
        }
        ```
    
- 注意：MySQL 在8.0.17版本时，把Member变为关键字了（8.0.19又退回了）
  - 目前在8.0.18，pom的配置可以正常启动
  - 但换到8.0.15，同样的pom却启动不了（醉了）


## DONE
- 20191221 - 会员等级 添加删除功能，优化代码

## TODO
- SSL
- 报表功能
- 前端太多重复代码。。。（需要优化）
  - (完全没有MVC的概念，js和h5混乱使用，继续优化。。。 20191221)


## 包含功能：

- 会员管理：主要为管理员提供了添加、查询、状态修改（这里有正常、挂失、停用）、会员消费、会员注销功能；
- 商品消费：提供了添加、修改、购买、查询积分记录等功能；
- 礼品消费：礼品设置、数量修改、兑换记录查询等功能；
- 积分抽奖：通过管理员设置抽奖积分然后随机分配给一位会员；
- 生日提醒：通过富文本编辑器提供人性化的邮件提醒服务；

tips:
- 本项目使用从Spring Boot1.5.9修改到了Spring Boot2.0.0
- 摒弃自定义过滤器设置登录，改用Spring Security


升级后部分修改：
- 加入Spring Security框架
- 部分Dao方法不能使用，比如findById返回对象由实体对象改为为Optional对象
- 修改部分bug，如：会员状态无法修改情况


默认密码都是123，登录名为 admin || 123

项目导入运行步骤可以前往博客文章[CSDN](http://blog.csdn.net/lger_pro/article/details/79181044)或[cnblogs](https://www.cnblogs.com/lger/p/8366320.html)