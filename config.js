var cfg = {

	SERVER : 'http://api.cn.faceplusplus.com/',
	API_KEY : '47fe6bb5417d660f93752c66d616d066',
	API_SECRET : 'w6rT60DvlRQ4dJ2JnUK24PCI3-Bai4j5',
	
	face:{
		/**
		 * 年龄范围
		 * 方案一
		 * min 最小年龄 正整数 0 1 50 100 无限制 unlimited
		 * max 最大年龄 正整数 0 1 50 100 无限制 unlimited
		 * min 要小于 max，否则逻辑错误
		 * 方案二 借鉴face++
		 * range 范围 0 1 7 unlimited
		 * value 期望的年龄 0 1 50 100 无限制 unlimited
		 */
		age:{
			// min:5,
			// max:30
			min:5,
			max:30
		},
		/**
		 * 性别
		 * 男 Male
		 * 女 Female
		 * 不限制 unlimited
		 */
		gender:'Female',
		/**
		 * 人种
		 * Yellow 黄种人
		 * White 白种人
		 * Black 黑种人
		 * 不限制 unlimited
		 */
		race:[
			'Yellow',
			'White'
		],
		/**
		 * 笑容值范围
		 * min 最小笑容值 正整数 无限制 unlimited
		 * max 最大笑容值 正整数 无限制 unlimited
		 */
		smiling:{
			min:'unlimited',
			max:'unlimited'
		}
	}
};