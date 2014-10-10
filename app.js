var App = (function(window, document, jQuery) {
	var appObj = {
		api:{},
		config:cfg,
		//美图筛选
		prettyPic: function(url){
			var self = this;
			this.detect(url,function(result){
				var facePass = self.detectData(result);
				if (facePass.allPass) {
					var prettyPic = document.createElement('img');
					prettyPic.src = url;
					document.body.appendChild(prettyPic);
				}
			});
		},
		//分析数据判断是否是美图
		detectData: function(data){
			if (!data) {return;}
			var facePass = {
				age:false,
				gender:false,
				race:false,
				smiling:false,
				allPass:false
			};

			var faces = data['face'];
			for (var i = 0; i < faces.length; i++) {
				var face = faces[i]['attribute'],
					age = face.age,
					gender = face.gender,
					race = face.race,
					smiling = face.smiling;

				var ftFace = this.config.face,
					ftAge = ftFace.age,
					ftGender = ftFace.gender,
					ftRace = ftFace.race,
					ftSmiling = ftFace.smiling;

				//年龄
				facePass.age = this.validateAge(age,ftAge);
				//性别
				facePass.gender = this.validateGender(gender,ftGender);
				//人种
				facePass.race = this.validateRace(race,ftRace);
				//笑容
				facePass.smiling = this.validateSmiling(smiling,ftSmiling);

				if (facePass.age && facePass.gender && facePass.race && facePass.smiling) {
					facePass.allPass = true;
					break;
				}
			}
			return facePass;

		},
		//判断年龄是否符合
		validateAge: function(age,ftAge){
			var isPass = true;

			if ((isNaN(ftAge.min) && ftAge.min != "unlimited") ||
				(isNaN(ftAge.max) && ftAge.max != "unlimited")) {
				isPass = false;
			}
			if (!isNaN(ftAge.min) && ftAge.min>age.value) {
				isPass = false;
			}
			if (!isNaN(ftAge.max) && ftAge.max<age.value) {
				isPass = false;
			}
			return isPass;
		},
		//判断性别是否符合
		validateGender: function(gender,ftGender){
			var isPass = false;

			if (gender.value == ftGender) {
				isPass = true;
			}else if(ftGender == "unlimited"){
				isPass = true;
			}

			return isPass;
		},
		//判断性别是否符合
		validateRace: function(race,ftRace){
			var isPass = false;

			if (ftRace == "unlimited") {
				isPass = true;
			}else if(ftRace.length){
				for (var i = 0; i < ftRace.length; i++) {
					if(race.value == ftRace[i]){
						isPass = true;
					}
				}
			}

			return isPass;
		},
		//判断性别是否符合
		validateSmiling: function(smiling,ftSmiling){
			var isPass = true;

			if ((isNaN(ftSmiling.min) && ftSmiling.min != "unlimited") ||
				(isNaN(ftSmiling.max) && ftSmiling.max != "unlimited")) {
				isPass = false;
			}
			if (!isNaN(ftSmiling.min) && ftSmiling.min>smiling.value) {
				isPass = false;
			}
			if (!isNaN(ftSmiling.max) && ftSmiling.max<smiling.value) {
				isPass = false;
			}
			return isPass;
		},
		//发送请求
		faceRequest: function(action,params,success,error) {
			this.api.request(action, {
				url: params.url//'http://www.faceplusplus.com.cn/static/resources/python_demo/1.jpg'
			}, function(err, result) {
				if (err) {
					$('#response').text('载入失败');
					error(err);
					return;
				}
				success(result);
				//$('#response').text(JSON.stringify(result));
			});
		},
		//图片分析
		detect:function(url,success){
			this.faceRequest('detection/detect',{
				url:url
			},function(result){
				success(result);
			});
		}
	}

	var App = function(config){
		appObj.api = new FacePP(config['API_KEY'], config['API_SECRET']);
		this.prettyPic = function(path){
			appObj.prettyPic(path);
		}
	}
	return App;
})(window, document/*, jQuery*/);