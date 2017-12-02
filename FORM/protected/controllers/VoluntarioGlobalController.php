
<?php

class VoluntarioGlobalController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	public function actionInserExpa(){
		try {
			$Json= $_POST['parametros'];
			$app_id=17379862;
			$app_token="1723b96a6f9e43cd82b470f7f6ab1dc2";
			Yii::import("application.extensions.podio.PodioAPI", true);
			Yii::import("application.extensions.Utilidades.Comite", true);
			Podio::setup("developerupb-lecr99", "ewH2NOFno2Aucnrxx7KcKmFUGrhQ5IBNJYnrHA3442j7IKf9wkQyl7EULzsfIC8g");
			Podio::authenticate_with_app($app_id, $app_token);
			$Comite=new Comite();
		

			$fields = new PodioItemFieldCollection(array(
			  new PodioTextItemField(array("external_id" => "titulo", "values" => $Json['txtFirstName'] )),
			  new PodioTextItemField(array("external_id" => "lastname", "values" => $Json['txtLastName'])),
			  new PodioTextItemField(array("external_id" => "phone-2",  "values" => $Json['txtPhone'])),
			  new PodioTextItemField(array("external_id" => "cellphone-2",  "values" => $Json['txtMobil'])),
			  new PodioCategoryItemField(array("external_id" => "email-2", "values" => $Json['txtmail'])),
			  new PodioCategoryItemField(array("external_id" => "iduniversity", "values" => $Json['valUniversidad'])),
			  new PodioCategoryItemField(array("external_id" => "university", "values" => $Json['nombreUniversidad'])),
			  new PodioCategoryItemField(array("external_id" => "howmet-2", "values" => (int) $Json['lstConocioOrganizacion'])),
			  new PodioCategoryItemField(array("external_id" => "fecha-de-viaje", "values" => (int) $Json['lstFechaViaje'])),
		 	  new PodioCategoryItemField(array("external_id" => "preferencia-de-contacto", "values" => (int) $Json['lstContactoPreferencia'])),

			  new PodioCategoryItemField(array("external_id" => "lc", "values" => $Comite->getValorPodio((int) $Json['valUniversidad'])))
			  ));

			$item = new PodioItem(array(
			  'app' => new PodioApp($app_id), 
			  'fields' => $fields
			  ));

			// Save the new item
			$item->save();
			$idColombia=1551;
			$nameColombia="COLOMBIA";
			$curl = curl_init();
			// Set some options - we are passing in a useragent too here
			curl_setopt_array($curl, array(
			    CURLOPT_RETURNTRANSFER => 1,
			    CURLOPT_URL => 'https://auth.aiesec.org/users/sign_in',
			    CURLOPT_USERAGENT => 'Codular Sample cURL Request'
			    ));		
			$result = curl_exec($curl);		
			curl_close($curl);		
			preg_match('/<meta content="(.*)" name="csrf-token" \/>/', $result, $matches);
			$gis_token = $matches[1];
			
			$fields = array(
		    'authenticity_token' => htmlspecialchars($gis_token),
		    'user[email]' => htmlspecialchars($Json['txtmail']),
		    'user[first_name]' => htmlspecialchars($Json['txtFirstName']),
		    'user[last_name]' => htmlspecialchars($Json['txtLastName']),
		    'user[password]' => htmlspecialchars($Json['txtPassword']),
		    'user[phone]' => htmlspecialchars($Json['txtMobil']),
		    'user[country]' => $nameColombia,  
		    'user[mc]' => $idColombia, 
		    'user[lc_input]' => htmlspecialchars($Json['valUniversidad']),
		    'user[lc]' => htmlspecialchars($Json['valUniversidad']),
		    'commit' => 'REGISTER'
		    );

			$fields_string = "";
			foreach($fields as $key=>$value) { $fields_string .= $key.'='.urlencode($value).'&'; }
			rtrim($fields_string, '&');
			$innerHTML = "";

			$url = "https://auth.aiesec.org/users";
			$ch2 = curl_init();
			curl_setopt($ch2, CURLOPT_URL, $url);
			curl_setopt($ch2, CURLOPT_POST, count($fields));
			curl_setopt($ch2, CURLOPT_POSTFIELDS, $fields_string);

			curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
			// give cURL the SSL Cert for Salesforce
			curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false); 

			$result = curl_exec($ch2);

			//curl_errors($ch2);
			//close connection
			curl_close($ch2);
			//echo $result;
			/*libxml_use_internal_errors(true);
			$doc = new DOMDocument();
			$doc->loadHTML($result);    
			libxml_clear_errors();
			$selector = new DOMXPath($doc);

			$result = $selector->query('//div[@id="error_explanation"]');
			echo "LLego";
			/*if $children = $result->item(0)->childNodes;
			
			(is_iterable($children))
			{
			    foreach ($children as $child) {
			        $tmp_doc = new DOMDocument();
			        $tmp_doc->appendChild($tmp_doc->importNode($child,true));  
			        $innerHTML .= strip_tags($tmp_doc->saveHTML());
			        //$innerHTML.add($tmp_doc->saveHTML());
			    }
			}

			$innerHTML = preg_replace('~[\r\n]+~', '', $innerHTML);
			$innerHTML = str_replace(array('"', "'"), '', $innerHTML);*/

		    //echo json_encode($matches);
		    echo  json_encode($result)  ;
	    }catch (Exception $e) {
		    echo json_encode( array(
			    "result" => false,
			    "message" => $e->getMessage(),
				));
		}

	}

	public function actionUniversidadesColombia(){
		$data = file_get_contents("https://gis-api.aiesec.org/v1/lists/mcs_alignments.json");
		$arrayData=json_decode($data);
		$colombia=[];
		foreach ($arrayData as $key => $value) {
			if($value->id==1551){
				$colombia=$value;
				break;
			}
		}
		echo json_encode($colombia);
	}
}
