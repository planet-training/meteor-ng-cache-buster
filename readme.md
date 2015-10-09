#Cache Bustering Mechanismn for public files on the meteor server

```meteor add planettraining:ng-cache-buster```

##Client

```
angular.module('yourApp', ['ngMeteorCacheBuster'])

```

```
<div ng-include="'file/in/public/folder.ng.html'">

</div>

```
Access Values directly:
```
function run(ngMeteorCacheKeys) {
    console.log(ngMeteorCacheKeys);
}
angular.run(run);
```


##Server

```
NgCacheBusterManager.manage('/file/in/public/folder.ng.html');

//or recursive
NgCacheBusterManager.manageAll('/a/directory/in/public');

//or explicit
NgCacheBusterManager.setEntry('some/path/file.txt',"1231231322321")
```

Any $http requests that are managed will have a ```_HASH_``` param with the files hash


NgCacheBusterManager.manage/All calls will start without a leading slash to work with angular loading
