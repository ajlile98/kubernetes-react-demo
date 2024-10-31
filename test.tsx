import {KubeConfig, CoreV1Api} from '@kubernetes/client-node'

const kc = new KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(CoreV1Api);

const getPods = async (namespace: string = 'default') => {
    try {
        const podsRes = await k8sApi.listNamespacedPod(namespace);
        // console.log(podsRes.body);
        return podsRes.body
    } catch (err) {
        console.error(err);
        throw err
    }
};

const getNamespaces = async () => {
    try {
        const res = await k8sApi.listNamespace();
        // console.log(podsRes.body);
        return res.body
    } catch (err) {
        console.error(err);
        throw err
    }
};


let namespace = await getNamespaces()
let pods = await getPods('kube-system')

{pods.items.map(_=><li>{JSON.stringify(_.metadata?.name)}</li>)}