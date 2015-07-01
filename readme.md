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

##Server

```
NgCacheBusterManager.manage('/file/in/public/folder.ng.html');

//or recursive
NgCacheBusterManager.manageAll('/a/directory/in/public');
```

Any $http requests that are managed will have a ```_HASH_``` param with the files hash

