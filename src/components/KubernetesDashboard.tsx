import { KubeConfig, CoreV1Api } from '@kubernetes/client-node'
import { NamespaceDropdown } from './NamespaceDropdown';

const kc = new KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(CoreV1Api);

const getPods = async (namespace: string = 'default') => {
    try {
        const res = await k8sApi.listNamespacedPod(namespace);
        // console.log(podsRes.body);
        return res.body
    } catch (err) {
        console.error(err);
        throw err
    }
};

const getNamespaces = async () => {
    try {
        const res = await k8sApi.listNamespace();
        // console.log(res.body);
        return res.body
    } catch (err) {
        console.error(err);
        throw err
    }
};


export const KubernetesDashboard = async () => {
    let namespaces = await getNamespaces()
    let pods = await getPods('kube-system')
    return (
        <div>
            <NamespaceDropdown namespaces={namespaces.items.map(x=>JSON.stringify(x.metadata?.name))}/>
            <ul>
                {pods.items.map(_ => <li>{JSON.stringify(_.metadata?.name)}</li>)}
            </ul>
        </div>
    )
}