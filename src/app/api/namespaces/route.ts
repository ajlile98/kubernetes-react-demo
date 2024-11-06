// app/api/data/route.js
import { KubeConfig, CoreV1Api } from '@kubernetes/client-node'
import type { NextRequest, NextResponse } from 'next/server'

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

export async function GET(req: NextRequest, { params }) {
  let namespaces = await getNamespaces()
  // let pods = await getPods(params.namespace)

  return new Response(
    JSON.stringify({
      message: 'Hello, this is your JSON response!',
      data: {
        namespaces: namespaces,
      },
      status: 'success',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}